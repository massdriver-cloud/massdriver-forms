import PropTypes from 'prop-types'
import ContainerRepositoriesDropdown from './ContainerRepositoriesDropdown'
import useHandleMissingSelectValue from '../hooks/useHandleMissingSelectValue'

const EnhancedContainerRepositoriesDropdown = ({
  formData,
  onChange,
  uiSchema,
  schema,
  services,
  ...props
}) => {

  const { data, loading, error } = services.getContainerRepositories({ cloud: uiSchema?.cloud })

  const returnType = uiSchema?.returnType || 'cloudProviderId'

  const missingValueWarning = useHandleMissingSelectValue(
    data,
    returnType,
    formData,
    onChange
  )

  const containerRepositoryKeys = Object.keys(
    data?.[0] || {}
  )

  data?.[0] &&
    !containerRepositoryKeys.includes(returnType) &&
    console.warn(
      'invalid returnType',
      `You have entered an invalid returnType '${returnType}' via the uiSchema. Here is a list of the valid return types: \n| ${containerRepositoryKeys.join(
        ' | '
      )} |.\n Be sure to enter a returnType that is unique to each item (like id) to ensure everything works as intended. In the case of an invalid returnType, the returnType will default to cloudProviderId.`
    )
  // do something with the message for the user
  missingValueWarning &&
    console.warn('missingValueWarning: ', missingValueWarning)

  return (
    <ContainerRepositoriesDropdown
      cloud={uiSchema?.cloud}
      loading={loading}
      error={error}
      containerRepositories={data}
      returnType={returnType}
      value={formData || ''}
      onChange={onChange}
      title={schema?.title}
      uiSchema={uiSchema}
      schema={schema}
      {...props}
    />
  )
}

EnhancedContainerRepositoriesDropdown.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
}

export default EnhancedContainerRepositoriesDropdown
