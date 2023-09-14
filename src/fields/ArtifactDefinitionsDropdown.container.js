import PropTypes from 'prop-types'
import ArtifactDefinitionsDropdown from './ArtifactDefinitionsDropdown'
import { unslugify } from '../utils/string'
import useFetchFieldData from '../hooks/useFetchFieldData'

const EnhancedArtifactDefinitionsDropdown = ({
  formData,
  onChange,
  uiSchema,
  schema,
  services,
  ...props
}) => {
  const { data, loading, error } = useFetchFieldData(services.getArtifactDefinitions({ filter: uiSchema?.filter }), 'getArtifactDefinitions')

  const artifactDefinitions = (data || [])
    .map(def => ({
      ...def,
      label: uiSchema?.removePrefix
        ? unslugify(def?.name?.split('/')?.[1] || '')
        : def?.name,
      value: def.name
    }))
    .sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))

  return (
    <ArtifactDefinitionsDropdown
      loading={loading}
      error={Boolean(error)}
      options={artifactDefinitions}
      value={formData || ''}
      onChange={onChange}
      title={schema?.title}
      uiSchema={uiSchema}
      schema={schema}
      {...props}
    />
  )
}

EnhancedArtifactDefinitionsDropdown.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
}

export default EnhancedArtifactDefinitionsDropdown
