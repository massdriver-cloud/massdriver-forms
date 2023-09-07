import PropTypes from 'prop-types'
import SupportedCloudLocationsDropdown from './SupportedCloudLocationsDropdown'
import { isTruthyString } from '../utils/string'

const EnhancedSupportedCloudLocationsDropdown = ({
  formData,
  onChange,
  uiSchema,
  schema,
  services,
  ...props
}) => {
  const cloudServiceCheck = isTruthyString(uiSchema?.cloudService)

  !cloudServiceCheck &&
    console.error(
      'The SupportedCloudLocationsDropdown must be provided a valid cloudService through the uiSchema'
    )

  const { data, loading, error } = services.getSupportedCloudLocations({ cloudService: uiSchema?.cloudService })

  return (
    <SupportedCloudLocationsDropdown
      loading={loading}
      value={formData || ''}
      errors={error}
      onChange={onChange}
      cloudService={uiSchema?.cloudService}
      supportedLocations={data?.supportedLocations?.locations}
      title={schema?.title}
      schema={schema}
      uiSchema={uiSchema}
      {...props}
    />
  )
}

EnhancedSupportedCloudLocationsDropdown.propTypes = {
  formData: PropTypes.string,
  uiSchema: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}

export default EnhancedSupportedCloudLocationsDropdown
