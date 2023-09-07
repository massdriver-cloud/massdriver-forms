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

const ContainerRepositoriesDropdown = ({
  cloud,
  loading,
  error,
  containerRepositories,
  value,
  returnType,
  onChange,
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
        onChange={event => {
          event?.target?.value && onChange(event.target.value)
        }}
        label={title || 'Container Repository'}
      >
        {loading ? (
          <LoadingContainer>
            <CircularProgress size={20} />
          </LoadingContainer>
        ) : error ? (
          <Typography variant='h6'>
            There was an issue fetching your container repositories.
          </Typography>
        ) : containerRepositories?.length > 0 ? (
          containerRepositories.map(repo => (
            <MenuItem key={repo.cloudProviderId} value={repo[returnType]}>
              <Stack
                direction='row'
                justifyContent='start'
                alignItems='center'
                spacing={1}
              >
                {repo.cloud && (
                  <CloudIcon
                    src={CLOUD_ICONS_MAP[repo.cloud]}
                    alt={repo.cloud}
                  />
                )}
                <MenuText variant='h6' title={repo.name}>
                  {repo.name}
                </MenuText>
              </Stack>
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>
            {`Your organization does not have any container repositories${cloud ? ` of cloud type: ${cloud}.` : '.'
              }`}
          </Typography>
        )}
      </TextField>
    )}
  </FieldWrapper>
)

ContainerRepositoriesDropdown.propTypes = {
  cloud: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  containerRepositories: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  returnType: PropTypes.string,
  title: PropTypes.string
}

export default ContainerRepositoriesDropdown

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
