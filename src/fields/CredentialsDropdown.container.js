import PropTypes from 'prop-types'
import CredentialsDropdown from './CredentialsDropdown'
import useFetchFieldData from '../hooks/useFetchFieldData'

const SORT_MAP = {
  'massdriver/aws-iam-role': 0,
  'massdriver/gcp-service-account': 1,
  'massdriver/azure-service-principal': 2,
  'massdriver/kubernetes-cluster': 3
}

const EnhancedCredentialsDropdown = ({
  formData,
  onChange,
  schema,
  uiSchema,
  services,
  ...props
}) => {
  const { data, loading, error } = useFetchFieldData(services.getCredentials(), 'getCredentials')


  const sortedData = [...(data || [])]?.sort((x, y) =>
    SORT_MAP[x?.type] < SORT_MAP[y?.type]
      ? -1
      : SORT_MAP[x?.type] > SORT_MAP[y?.type]
        ? 1
        : 0
  )

  return (
    <CredentialsDropdown
      loading={loading}
      error={Boolean(error)}
      options={sortedData.map(credential => ({
        ...credential,
        label: credential?.name,
        value: credential?.id
      }))}
      value={formData || ''}
      title={schema?.title}
      onChange={onChange}
      schema={schema}
      uiSchema={uiSchema}
      {...props}
    />
  )
}

EnhancedCredentialsDropdown.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
}

export default EnhancedCredentialsDropdown
