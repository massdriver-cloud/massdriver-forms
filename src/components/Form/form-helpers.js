import Ajv from 'ajv'
import { expensiveJankyJsonCopy, removePropsWhen, isPojo } from '../../utils/data'
import { pipe } from '../../utils/functional'

export const getPropertyFromPath = (pathArray, data) =>
  pathArray.length < 1
    ? data
    : getPropertyFromPath(pathArray.slice(1), data?.[pathArray[0]])

export const createTransformErrors = (schema, transformErrors) => errors => {
  // Transforms the errors to use the custom 'messages' in schema
  const globalTransformedErrors = errors.map(error => {
    // Recursively gets the property object from the schemaPath.
    const property = getPropertyFromPath(
      error.schemaPath
        .split('/')
        .slice(1, error.schemaPath.split('/').length - 1),
      schema
    )

    return {
      ...error,
      ...(property?.message?.[error?.name]
        ? {
          message: property?.message?.[error?.name],
          stack: `${error.property}: ${property?.message?.[error?.name]}`
        }
        : {})
    }
  })

  // Transforms the errors again if a custom 'transformErrors' function is passed
  return transformErrors
    ? transformErrors(globalTransformedErrors)
    : globalTransformedErrors
}

// Strips `additionalProprties` but only when its not and object.
export const stripAdditionalProperties = schema => {
  // The `removeProps` util mutates. We need a new one
  // of these that doesn't mutate!
  removePropsWhen(schema, ['additionalProperties'], value => !isPojo(value))
  return schema
}

/**
 * These run in left -> right order. Ensure all functions in the chain do
 * not mutate OR that the first one does a deep copy like `expensiveJankyJsonCopy`.
 */
export const modSchema = pipe(expensiveJankyJsonCopy, stripAdditionalProperties)

/**
 * Produces a function to lazily initialize form data state.
 * Uses Ajv validation with `removeAdditional` flag to remove data that is no
 * longer supported in the schema. Using the rjsf prop `omitExtraData` doesnt
 * work for this purpose.
 */
export const sanitizeFormData = (formData, formSchema) => () => {
  const ajv = new Ajv({
    strict: false,
    validateFormats: false,
    removeAdditional: true
  })

  const dataCopy = expensiveJankyJsonCopy(formData)
  const validate = ajv.compile(formSchema)
  validate(dataCopy)
  // NOTE: Would be awesome to handle validation errors at this point somehow
  // and surface the errors in the form
  return dataCopy
}
