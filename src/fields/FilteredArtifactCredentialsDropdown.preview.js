import PropTypes from 'prop-types'
import FilteredArtifactCredentialsDropdown from './FilteredArtifactCredentialsDropdown'

const FilteredArtifactCredentialsDropdownPreview = ({
  value,
  formData,
  onChange,
  schema,
  ...props
}) => (
  <FilteredArtifactCredentialsDropdown
    loading={false}
    value={formData || value || ''}
    onChange={onChange}
    title={schema?.title}
    error={false}
    cloudType='massdriver/aws-iam-role'
    sortedArtifacts={[
      {
        name: 'Credential 1',
        id: '1'
      },
      {
        name: 'Credential 2',
        id: '2'
      },
      {
        name: 'Credential 3',
        id: '3'
      },
      {
        name: 'Credential 4',
        id: '4'
      },
      {
        name: 'Credential 5',
        id: '5'
      }
    ]}
    schema={schema}
    {...props}
  />
)

export default FilteredArtifactCredentialsDropdownPreview

FilteredArtifactCredentialsDropdownPreview.propTypes = {
  value: PropTypes.string,
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}
