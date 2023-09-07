import PropTypes from 'prop-types'
import DnsZonesDropdown from './DnsZonesDropdown'
import useHandleMissingSelectValue from '../hooks/useHandleMissingSelectValue'

const EnhancedDnsZonesDropdown = ({
  formData,
  onChange,
  schema,
  uiSchema,
  services,
  ...props
}) => {

  const { data, loading, error } = services.getDnsZones({ cloud: uiSchema?.cloud })

  const missingValueWarning = useHandleMissingSelectValue(
    data?.dnsZones,
    'cloudProviderId',
    formData,
    onChange
  )

  // do something with the message for the user
  missingValueWarning &&
    console.warn('missingValueWarning: ', missingValueWarning)

  return (
    <DnsZonesDropdown
      cloud={uiSchema?.cloud}
      loading={loading}
      error={error}
      dnsZones={data}
      value={formData || ''}
      title={schema?.title}
      onChange={onChange}
      schema={schema}
      uiSchema={uiSchema}
      {...props}
    />
  )
}

EnhancedDnsZonesDropdown.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
}

export default EnhancedDnsZonesDropdown
