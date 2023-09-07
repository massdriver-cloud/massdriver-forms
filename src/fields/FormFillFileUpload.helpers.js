/**
 * Strips all formData values that match the default set in the schema.
 *
 * returns:
 *    oldValues: all of the default values found in the current formData
 *    newValues: the formData after being stripped of the default values
 */

export const stripDefaultValues = (formData = {}, properties = {}) =>
  Object?.keys(formData)?.reduce(
    (prev, curr) => ({
      ...prev,
      ...(properties?.[curr]?.default === formData?.[curr]
        ? {
          oldValues: {
            ...prev?.oldValues,
            [curr]: formData?.[curr]
          }
        }
        : {
          newValues: {
            ...prev?.newValues,
            [curr]: formData?.[curr]
          }
        })
    }),
    {
      oldValues: {},
      newValues: {}
    }
  )
