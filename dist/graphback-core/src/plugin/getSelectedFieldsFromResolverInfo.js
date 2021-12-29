import { fieldsMap, fieldsList } from 'graphql-fields-list';
/**
 * Find selectable fields from resolve info for a given model starting on a given path
 * @param info - the resolver info object
 * @param model - the model to find the fields from
 * @param path - the root path to start field resolution from.
 */
export const getSelectedFieldsFromResolverInfo = (info, model, path) => {
    const resolverFields = Object.keys(fieldsMap(info, { path }));
    return getModelFieldsFromResolverFields(resolverFields, model);
};
/**
 * Get the model specific-fields from a full list of fields
 *
 * @param {string[]} resolverFields - resolver field names
 * @param {ModelDefinition} model - Graphback model
 */
export const getModelFieldsFromResolverFields = (resolverFields, model) => {
    const selectedFields = new Set();
    for (const key of resolverFields) {
        const correspondingFieldInDatabase = model.fields[key];
        if (correspondingFieldInDatabase && !correspondingFieldInDatabase.transient) {
            selectedFields.add(correspondingFieldInDatabase.name);
        }
    }
    return [...selectedFields];
};
/**
 * Find fields list of resolver info starting at a given path.
 * If path is undefined, return top level fields information.
 * @param info - the resolver info object
 * @param path - the root path to start field resolution from
 */
export const getResolverInfoFieldsList = (info, path) => fieldsList(info, { path });
//# sourceMappingURL=getSelectedFieldsFromResolverInfo.js.map