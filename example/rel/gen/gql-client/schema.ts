import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    Int: number,
    ID: string,
    Timestamp: any,
    Boolean: boolean,
    Float: number,
}

export interface Mutation {
    createUser?: User
    updateUser?: User
    updateUsers?: UserMutationResultList
    deleteUser?: User
    deleteUsers?: UserMutationResultList
    __typename: 'Mutation'
}

export interface Query {
    getUser?: User
    findUsers: UserResultList
    __typename: 'Query'
}

export type SortDirectionEnum = 'DESC' | 'ASC'

export interface Subscription {
    newUser: User
    updatedUser: User
    deletedUser: User
    __typename: 'Subscription'
}

export interface User {
    name: Scalars['String']
    email?: Scalars['String']
    _id?: Scalars['ID']
    count?: Scalars['Int']
    createdAt?: Scalars['Timestamp']
    updatedAt?: Scalars['Timestamp']
    __typename: 'User'
}

export type UserFieldsEnum = '_id' | 'name' | 'email'

export interface UserMutationResultList {
    items: (User | undefined)[]
    __typename: 'UserMutationResultList'
}

export interface UserResultList {
    items: (User | undefined)[]
    offset?: Scalars['Int']
    limit?: Scalars['Int']
    count?: Scalars['Int']
    __typename: 'UserResultList'
}

export interface CreateUserInput {name: Scalars['String'],email?: (Scalars['String'] | null),count?: (Scalars['Int'] | null)}

export interface IDInput {ne?: (Scalars['ID'] | null),eq?: (Scalars['ID'] | null),le?: (Scalars['ID'] | null),lt?: (Scalars['ID'] | null),ge?: (Scalars['ID'] | null),gt?: (Scalars['ID'] | null),in?: (Scalars['ID'][] | null)}

export interface IntInput {ne?: (Scalars['Int'] | null),eq?: (Scalars['Int'] | null),le?: (Scalars['Int'] | null),lt?: (Scalars['Int'] | null),ge?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),between?: (Scalars['Int'][] | null)}

export interface MutateUserInput {name?: (Scalars['String'] | null),email?: (Scalars['String'] | null),_id?: (Scalars['ID'] | null),count?: (Scalars['Int'] | null)}

export interface MutationRequest{
    createUser?: [{input: CreateUserInput},UserRequest]
    updateUser?: [{input: MutateUserInput},UserRequest]
    updateUsers?: [{filter?: (UserFilter | null),input: MutateUserInput},UserMutationResultListRequest]
    deleteUser?: [{_id: Scalars['ID']},UserRequest]
    deleteUsers?: [{filter?: (UserFilter | null)},UserMutationResultListRequest] | UserMutationResultListRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OfUserInput {of?: (UserFieldsEnum | null)}

export interface PageRequest {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null)}

export interface QueryRequest{
    getUser?: [{_id: Scalars['ID']},UserRequest]
    findUsers?: [{filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: ((UserOrderByInput | null)[] | null)},UserResultListRequest] | UserResultListRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringInput {ne?: (Scalars['String'] | null),eq?: (Scalars['String'] | null),le?: (Scalars['String'] | null),lt?: (Scalars['String'] | null),ge?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),contains?: (Scalars['String'] | null),startsWith?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null)}

export interface SubscriptionRequest{
    newUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    updatedUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    deletedUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TimestampInput {ne?: (Scalars['Timestamp'] | null),eq?: (Scalars['Timestamp'] | null),le?: (Scalars['Timestamp'] | null),lt?: (Scalars['Timestamp'] | null),ge?: (Scalars['Timestamp'] | null),gt?: (Scalars['Timestamp'] | null),in?: (Scalars['Timestamp'][] | null),between?: (Scalars['Timestamp'][] | null)}

export interface UserRequest{
    name?: boolean | number
    email?: boolean | number
    _id?: boolean | number
    count?: [{of?: (OfUserInput | null),distinct?: (Scalars['Boolean'] | null)}] | boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserFilter {name?: (StringInput | null),email?: (StringInput | null),_id?: (IDInput | null),count?: (IntInput | null),and?: (UserFilter[] | null),or?: (UserFilter[] | null),not?: (UserFilter | null),createdAt?: (TimestampInput | null),updatedAt?: (TimestampInput | null)}

export interface UserMutationResultListRequest{
    items?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserOrderByInput {field?: (UserFieldsEnum | null),order?: (SortDirectionEnum | null)}

export interface UserResultListRequest{
    items?: UserRequest
    offset?: boolean | number
    limit?: boolean | number
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserSubscriptionFilter {and?: (UserSubscriptionFilter[] | null),or?: (UserSubscriptionFilter[] | null),not?: (UserSubscriptionFilter | null),name?: (StringInput | null),email?: (StringInput | null),_id?: (IDInput | null),count?: (IntInput | null)}


const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Subscription_possibleTypes = ['Subscription']
export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
  return Subscription_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



const UserMutationResultList_possibleTypes = ['UserMutationResultList']
export const isUserMutationResultList = (obj?: { __typename?: any } | null): obj is UserMutationResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUserMutationResultList"')
  return UserMutationResultList_possibleTypes.includes(obj.__typename)
}



const UserResultList_possibleTypes = ['UserResultList']
export const isUserResultList = (obj?: { __typename?: any } | null): obj is UserResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUserResultList"')
  return UserResultList_possibleTypes.includes(obj.__typename)
}


export interface MutationPromiseChain{
    createUser: ((args: {input: CreateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    updateUser: ((args: {input: MutateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    updateUsers: ((args: {filter?: (UserFilter | null),input: MutateUserInput}) => UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>}),
    deleteUser: ((args: {_id: Scalars['ID']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    deleteUsers: ((args?: {filter?: (UserFilter | null)}) => UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>})&(UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>})
}

export interface MutationObservableChain{
    createUser: ((args: {input: CreateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    updateUser: ((args: {input: MutateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    updateUsers: ((args: {filter?: (UserFilter | null),input: MutateUserInput}) => UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>}),
    deleteUser: ((args: {_id: Scalars['ID']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    deleteUsers: ((args?: {filter?: (UserFilter | null)}) => UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>})&(UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>})
}

export interface QueryPromiseChain{
    getUser: ((args: {_id: Scalars['ID']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    findUsers: ((args?: {filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: ((UserOrderByInput | null)[] | null)}) => UserResultListPromiseChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Promise<FieldsSelection<UserResultList, R>>})&(UserResultListPromiseChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Promise<FieldsSelection<UserResultList, R>>})
}

export interface QueryObservableChain{
    getUser: ((args: {_id: Scalars['ID']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    findUsers: ((args?: {filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: ((UserOrderByInput | null)[] | null)}) => UserResultListObservableChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Observable<FieldsSelection<UserResultList, R>>})&(UserResultListObservableChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Observable<FieldsSelection<UserResultList, R>>})
}

export interface SubscriptionPromiseChain{
    newUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    updatedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    deletedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})
}

export interface SubscriptionObservableChain{
    newUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    updatedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    deletedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})
}

export interface UserPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    _id: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)>}),
    count: ((args?: {of?: (OfUserInput | null),distinct?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)>})
}

export interface UserObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    _id: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)>}),
    count: ((args?: {of?: (OfUserInput | null),distinct?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)>})
}

export interface UserMutationResultListPromiseChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Promise<(FieldsSelection<User, R> | undefined)[]>})
}

export interface UserMutationResultListObservableChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Observable<(FieldsSelection<User, R> | undefined)[]>})
}

export interface UserResultListPromiseChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Promise<(FieldsSelection<User, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface UserResultListObservableChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Observable<(FieldsSelection<User, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}