import PropTypes from 'prop-types'
import SupportedCloudLocationsDropdown from './SupportedCloudLocationsDropdown'
import { isTruthyString } from '../utils/string'
import useFetchFieldData from '../hooks/useFetchFieldData'

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

  const { data, loading, error } = useFetchFieldData(services.getSupportedCloudLocations({ cloudService: uiSchema?.cloudService }), 'getSupportedCloudLocations')

  return (
    <SupportedCloudLocationsDropdown
      loading={loading}
      value={formData || ''}
      error={Boolean(error)}
      onChange={onChange}
      cloudService={uiSchema?.cloudService}
      supportedLocations={data}
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
