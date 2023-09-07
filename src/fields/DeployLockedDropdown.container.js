import { useState } from 'react'
import PropTypes from 'prop-types'
import DeployLockedDropdown from './DeployLockedDropdown'

const EnhancedDeployLockedDropdown = ({
  formData,
  onChange,
  uiSchema,
  schema,
  formContext,
  ...props
}) => {
  const [pastValue] = useState(formContext?.hasDeployed ? formData : '')

  const disableType = uiSchema?.disableType || 'lower'
  console.log({ props })
  return (
    <DeployLockedDropdown
      pastValue={pastValue}
      disableType={disableType}
      value={formData || ''}
      onChange={onChange}
      items={schema?.enum}
      title={schema?.title}
      schema={schema}
      uiSchema={uiSchema}
      formContext={formContext}
      {...props}
    />
  )
}

EnhancedDeployLockedDropdown.propTypes = {
  formData: PropTypes.string,
  uiSchema: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}

export default EnhancedDeployLockedDropdown
