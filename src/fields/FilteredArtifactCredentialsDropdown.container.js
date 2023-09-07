import PropTypes from 'prop-types'
import FilteredArtifactCredentialsDropdown from './FilteredArtifactCredentialsDropdown'
import { isTruthyString } from '../utils/string'

const EnhancedFilteredArtifactCredentialsDropdown = ({
  formData,
  onChange,
  uiSchema,
  schema,
  services,
  ...props
}) => {
  const cloudTypeCheck = isTruthyString(uiSchema?.cloudType)

  !cloudTypeCheck &&
    console.error(
      'The FilteredArtifactCredentialsDropdown must be provided a valid cloudType through the uiSchema'
    )

  const { data, loading, error } = services.getFilteredArtifactCredentials({ type: uiSchema?.cloudType })


  const sortedArtifacts = data
    ? [...data].sort((x, y) =>
      x.name < y.name ? -1 : x.name > y.name ? 1 : 0
    )
    : []

  return (
    <FilteredArtifactCredentialsDropdown
      loading={loading}
      value={formData || ''}
      onChange={onChange}
      title={schema?.title}
      error={error}
      cloudType={uiSchema?.cloudType}
      sortedArtifacts={sortedArtifacts}
      schema={schema}
      uiSchema={uiSchema}
      {...props}
    />
  )
}

EnhancedFilteredArtifactCredentialsDropdown.propTypes = {
  formData: PropTypes.string,
  uiSchema: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}

export default EnhancedFilteredArtifactCredentialsDropdown
