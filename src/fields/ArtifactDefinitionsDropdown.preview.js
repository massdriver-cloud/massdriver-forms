import PropTypes from 'prop-types'
import ArtifactDefinitionsDropdown from 'rjsf/fields/ArtifactDefinitionsDropdown'

const ArtifactDefinitionsDropdownPreview = ({
  formData,
  onChange,
  uiSchema,
  schema,
  ...props
}) => (
  <ArtifactDefinitionsDropdown
    loading={false}
    error={false}
    artifactDefinitions={[
      {
        name: 'ArtDef1',
        label: 'ArtDef1',
        value: 'ArtDef1'
      },
      {
        name: 'ArtDef2',
        label: 'ArtDef2',
        value: 'ArtDef2'
      },
      {
        name: 'ArtDef3',
        label: 'ArtDef3',
        value: 'ArtDef3'
      },
      {
        name: 'ArtDef4',
        label: 'ArtDef4',
        value: 'ArtDef4'
      }
    ]}
    value={formData || ''}
    onChange={onChange}
    title={schema?.title}
    uiSchema={uiSchema}
    schema={schema}
    {...props}
  />
)

ArtifactDefinitionsDropdownPreview.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
}

export default ArtifactDefinitionsDropdownPreview
