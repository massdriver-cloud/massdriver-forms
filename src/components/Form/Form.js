import { useState, useEffect } from 'react'
import { Form as ThemedForm } from '@rjsf/mui'
import { createTransformErrors, modSchema } from './form-helpers'
import validator from '@massdriver/rjsf-validator'
import customTemplates from '../../templates/templates'

const Form = ({
  schema,
  transformErrors,
  widgets,
  fields,
  templates,
  validator: customValidator,
  showErrorList = false,
  ...props
}) => {
  const [newSchema, setNewSchema] = useState(schema)

  useEffect(() => {
    setNewSchema(modSchema(schema))
  }, [schema])

  return (
    <ThemedForm
      widgets={widgets}
      fields={fields}
      templates={{ ...customTemplates, ...templates }}
      schema={newSchema}
      validator={customValidator || validator}
      transformErrors={createTransformErrors(newSchema, transformErrors)}
      showErrorList={showErrorList}
      idSeparator='::'
      {...props}
    />
  )
}

export default Form
