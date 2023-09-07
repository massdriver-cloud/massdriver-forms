import PropTypes from 'prop-types'
import SupportedCloudLocationsDropdown from './SupportedCloudLocationsDropdown'

const SupportedCloudLocationsDropdownPreview = ({
  value,
  onChange,
  schema,
  formData: formValue,
  ...props
}) => (
  <SupportedCloudLocationsDropdown
    loading={false}
    value={formValue || value || ''}
    errors={false}
    onChange={onChange}
    cloudService='ECR'
    supportedLocations={[
      'Location 1',
      'Location 2',
      'Location 3',
      'Location 4',
      'Location 5',
      'Location 6'
    ]}
    title={schema?.title}
    schema={schema}
    {...props}
  />
)

export default SupportedCloudLocationsDropdownPreview

SupportedCloudLocationsDropdownPreview.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  formData: PropTypes.string
}
