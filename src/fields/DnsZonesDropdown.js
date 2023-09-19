import PropTypes from 'prop-types'
import stylin from '../utils/stylin'
import FieldWrapper from './FieldWrapper'

import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import awsIcon from '../assets/aws-icon.png'
import gcpIcon from '../assets/gcp-icon.png'
import azureIcon from '../assets/azure-icon.png'

const CLOUD_ICONS_MAP = {
  aws: awsIcon,
  gcp: gcpIcon,
  azure: azureIcon
}

const DnsZonesDropdown = ({
  cloud,
  loading,
  error,
  dnsZones,
  onChange,
  value,
  title,
  ...props
}) => (
  <FieldWrapper {...props}>
    {({ hasSchemaErrors, required, disabled }) => (
      <TextField
        required={required}
        disabled={disabled}
        error={hasSchemaErrors}
        select
        fullWidth
        value={loading ? '' : value}
        onChange={event =>
          event?.target?.value && onChange && onChange(event.target.value)
        }
        label={title || 'DNS Zone'}
      >
        {loading ? (
          <LoadingContainer>
            <CircularProgress size={20} />
          </LoadingContainer>
        ) : error ? (
          <Typography variant='h6'>
            There was an issue fetching your DNS Zones.
          </Typography>
        ) : dnsZones?.length > 0 ? (
          dnsZones.map(({ name, cloud, cloudProviderId }) => (
            <MenuItem key={cloudProviderId} value={cloudProviderId}>
              <Stack
                direction='row'
                justifyContent='start'
                alignItems='center'
                spacing={1}
              >
                {cloud && (
                  <CloudIcon src={CLOUD_ICONS_MAP[cloud]} alt={cloud} />
                )}
                <MenuText variant='h6' title={name}>
                  {name}
                </MenuText>
              </Stack>
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>
            {`Your organization does not have any DNS Zones${cloud ? ` of cloud type: ${cloud}.` : '.'
              }`}
          </Typography>
        )}
      </TextField>
    )}
  </FieldWrapper>
)

DnsZonesDropdown.propTypes = {
  cloud: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dnsZones: PropTypes.array,
  title: PropTypes.string
}

export default DnsZonesDropdown

const LoadingContainer = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const CloudIcon = stylin('img')({
  height: '20px',
  width: '20px'
})

const MenuText = stylin(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})
