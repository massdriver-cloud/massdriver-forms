import Form from '../components/Form/Form'
import customFields from '../fields/fields'
import customWidgets from '../widgets/widgets'
import createServices from './services.js'
import withServices from '../components/withServices.js'

const createForm = (options = {}) => {
  const services = createServices(options.services)

  const widgetsWithServices = Object.keys(customWidgets).reduce((prev, cur) => ({
    ...prev,
    [cur]: withServices(customWidgets[cur], services)
  }), {})

  const fieldsWithServices = Object.keys(customFields).reduce((prev, cur) => ({
    ...prev,
    [cur]: withServices(customFields[cur], services)
  }), {})

  return ({ widgets, fields, children, ...props }) => children === undefined ? (
    <Form
      widgets={{ ...widgetsWithServices, ...widgets }}
      fields={{ ...fieldsWithServices, ...fields }}
      {...props}
    />
  ) : (
    <Form
      widgets={{ ...widgetsWithServices, ...widgets }}
      fields={{ ...fieldsWithServices, ...fields }}
      {...props}
    >
      {children}
    </Form>
  )
}

export default createForm
