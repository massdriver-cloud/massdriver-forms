import PropTypes from 'prop-types'
import DnsZonesDropdown from './DnsZonesDropdown'

const DnsZonesDropdownPreview = ({
  value,
  formData,
  onChange,
  schema,
  ...props
}) => (
  <DnsZonesDropdown
    loading={false}
    error={false}
    dnsZones={[
      {
        name: 'Dns Zone 1',
        id: '1'
      },
      {
        name: 'Dns Zone 2',
        id: '2'
      },
      {
        name: 'Dns Zone 3',
        id: '3'
      },
      {
        name: 'Dns Zone 4',
        id: '4'
      },
      {
        name: 'Dns Zone 5',
        id: '5'
      }
    ]}
    value={formData || value || ''}
    onChange={onChange}
    title={schema?.title}
    schema={schema}
    {...props}
  />
)

export default DnsZonesDropdownPreview

DnsZonesDropdownPreview.propTypes = {
  value: PropTypes.string,
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}
