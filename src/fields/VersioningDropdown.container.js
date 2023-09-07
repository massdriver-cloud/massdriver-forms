import { useState } from 'react'
import PropTypes from 'prop-types'
import VersioningDropdown from './VersioningDropdown'
import semverUtil from '../utils/semver'

const EnhancedVersioningDropdown = ({
  formData,
  onChange,
  uiSchema,
  schema,
  formContext,
  ...props
}) => {
  const [pastValue] = useState(formContext?.hasDeployed ? formData : '')

  const versions = semverUtil?.sort(schema?.enum, 'desc')

  return (
    <VersioningDropdown
      pastValue={pastValue}
      value={formData || ''}
      onChange={onChange}
      versions={versions}
      title={schema?.title}
      schema={schema}
      uiSchema={uiSchema}
      formContext={formContext}
      {...props}
    />
  )
}

EnhancedVersioningDropdown.propTypes = {
  formData: PropTypes.string,
  uiSchema: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}

export default EnhancedVersioningDropdown
