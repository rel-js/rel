import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { buildSchema } from 'graphql';
import { GraphbackCoreMetadata, metadataMap, NoDataError, defaultTableNameTransform } from '@graphback/core';
import { advanceTo } from "jest-date-mock";
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { DataSyncMongoDBDataProvider, DataSyncPlugin, ConflictError } from '../src';

const {fieldNames} = metadataMap;
export interface Context {
  providers: { [modelname: string]: DataSyncMongoDBDataProvider };
  server: MongoMemoryServer,
  db: Db
}

export async function createTestingContext(schemaStr: string, config?: { seedData: { [collection: string]: any[] } }): Promise<Context> {
  // Setup graphback
  const schema = buildSchema(schemaStr);

  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true });
  await client.connect();
  const db = client.db('test');

  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }

  const schemaGenerator = new SchemaCRUDPlugin();
  const DataSyncGenerator = new DataSyncPlugin();
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, schema)
  metadata.setSchema(schemaGenerator.transformSchema(metadata));
  metadata.setSchema(DataSyncGenerator.transformSchema(metadata));

  const providers: { [name: string]: DataSyncMongoDBDataProvider } = {}
  const models = metadata.getModelDefinitions();
  for (const model of models) {
    providers[model.graphqlType.name] = new DataSyncMongoDBDataProvider(model, db);
  }

  // if seed data is supplied, insert it into collections
  if (config?.seedData) {
    const collectionNames = Object.keys(config.seedData);
    for (const collectionName of collectionNames) {
      for (const element of config.seedData[collectionName]) {
        await providers[collectionName].create(element, {graphback: {services: {}, options: { selectedFields: ["_id"]}}});
      }
    };
  }

  return { server, providers, db }
}

const fields = ["_id", "text"];
const postSchema = `
"""
@model
@datasync
"""
type Post {
  _id: GraphbackObjectID!
  text: String!
}

scalar GraphbackObjectID
`;

describe('Soft deletion test', () => {
  let context: Context;
  afterEach(async () => context.server.stop());

  it('sets deleted to false on creation', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    const first = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: ["_deleted"]}}});
    expect(first._deleted).toEqual(false)
  })

  it('sets deleted to true on deletion', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;
    const startTime = 1590679886048;
    const deleteTime = 1590679887032;
    advanceTo(startTime);
    const { _id } = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: fields}}});
    advanceTo(deleteTime);

    // check count
    let count = await Post.count({});
    expect(count).toEqual(1);

    // delete the Post
    const deletedPost = await Post.delete({ _id, _version }, {graphback: {services: {}, options: { selectedFields: ["_deleted", "_version"]}}});
    expect(deletedPost._deleted).toEqual(true);
    expect(deletedPost._version).toEqual(2);

    // re check count after deletion
    count = await Post.count({});
    expect(count).toEqual(0);

    // Tests that we cannot find it anymore
    // This test fails if we can still find the document
    await expect(Post.findOne({ _id }, {graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(NoDataError);
  })

  it('can filter sync queries', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    // Create some posts
    for (const postTitle of ["post", "post2", "trains"]) {
      await Post.create({ text: postTitle }, {graphback: {services: {}, options: { selectedFields: fields}}});
    }

    // Sync query
    const deltaPosts = await Post.sync("0", {graphback: {services: {}, options: { selectedFields: fields}}}, {
      text: {
        startsWith: 'post'
      }
    });

    expect(deltaPosts.length).toEqual(2);

    for (const p of deltaPosts) {
      expect(p.text).toMatch(/^post/g);
    }

    // check count
    const count = await Post.count({
      text: {
        startsWith: 'post'
      }
    });
    expect(count).toEqual(2);
  })

  it('throws conflict error for update/delete conflicts', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;
    const startTime = 1590679886048;
    const updateTime = 1590679887032;
    advanceTo(startTime);
    const { id, _version } = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, "_version"]}}});

    // Update document once
    advanceTo(updateTime);
    await Post.update({ id, text: 'updated post text', _version }, {graphback: {services: {}, options: { selectedFields: fields}}});

    // Try to update document again with older timestamp
    await expect(Post.update({ id, text: 'updated post text 2', _version }, {graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(ConflictError);

    // Try to delete document with older timestamp
    await expect(Post.delete({ id, _version }, {graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(ConflictError);
  })

  it('sets updatedAt when field absent', async () => {
    context = await createTestingContext(postSchema);

    const { db, providers } = context;
    const { Post } = providers;

    const postid = await (await db.collection(defaultTableNameTransform('Post', 'to-db')).insertOne({ text: 'TestPost' })).insertedId
    const updateTime = 1593263130987
    advanceTo(updateTime);
    const update = await Post.update({ _id: postid, text: 'SeriousPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, fieldNames.updatedAt]}}});
    expect(update[fieldNames.updatedAt]).toEqual(updateTime)
  })

  it('sets _deleted when field absent', async () => {
    context = await createTestingContext(postSchema);

    const { db, providers } = context;
    const { Post } = providers;

    const postid = await (await db.collection(defaultTableNameTransform('Post', 'to-db')).insertOne({ text: 'TestPost'})).insertedId

    const updateTime = 1593263130987
    advanceTo(updateTime);
    const deletedPost = await Post.delete({ _id: postid, text: 'SeriousPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, fieldNames.updatedAt, "_deleted"]}}});
    expect(deletedPost[fieldNames.updatedAt]).toEqual(updateTime)
    expect(deletedPost._deleted).toEqual(true);
  })

  it('sets _version when created', async () => {
    context = await createTestingContext(`
    """
    @model
    @datasync
    """
    type Post {
      id: ID!
      text: String!
    }
    `);

    const { db, providers } = context;
    const { Post } = providers;

    const { id, _version } = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, "_version"]}}});
    expect(_version).toEqual(1);
  })

  it('sets _version when updated', async () => {
    context = await createTestingContext(`
    """
    @model
    @datasync
    """
    type Post {
      id: ID!
      text: String!
    }
    `);

    const { db, providers } = context;
    const { Post } = providers;

    const createdPost = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, "_version"]}}});
    const { _version } = await Post.update({ id: createdPost.id, _version: createdPost._version, text: 'TestPost2' }, {graphback: {services: {}, options: { selectedFields: [...fields, "_version"]}}});
    expect(_version).toEqual(2);
  })
})
