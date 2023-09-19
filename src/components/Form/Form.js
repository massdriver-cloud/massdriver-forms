import { useState, useEffect } from 'react'
import { Form as ThemedForm } from '@rjsf/mui'
import { createTransformErrors, modSchema } from './form-helpers'
import validator from '@massdriver/rjsf-validator'
import customTemplates from '../../templates/templates'
import createServices from '../../factories/services.js'
import customFields from '../../fields/fields'
import customWidgets from '../../widgets/widgets'
import withServices from '../withServices'

const Form = ({
  schema,
  transformErrors,
  widgets,
  fields,
  templates,
  validator: customValidator,
  showErrorList = false,
  services: passedServices,
  ...props
}) => {
  const [newSchema, setNewSchema] = useState(schema)

  useEffect(() => {
    setNewSchema(modSchema(schema))
  }, [schema])


  const services = createServices(passedServices)

  const allWidgets = {
    ...customWidgets,
    ...widgets,
  }

  const widgetsWithServices = Object.keys(allWidgets).reduce((prev, cur) => ({
    ...prev,
    [cur]: withServices(allWidgets[cur], services)
  }), {})

  const allFields = {
    ...customFields,
    ...fields
  }

  const fieldsWithServices = Object.keys(allFields).reduce((prev, cur) => ({
    ...prev,
    [cur]: withServices(allFields[cur], services)
  }), {})

  return (
    <ThemedForm
      widgets={widgetsWithServices}
      fields={fieldsWithServices}
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
