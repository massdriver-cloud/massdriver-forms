import PropTypes from 'prop-types'
import stylin from '../utils/stylin'
import FieldWrapper from './FieldWrapper'
import AutocompleteField from '../components/AutocompleteField'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import InputAdornment from '@mui/material/InputAdornment'

import awsLogo from '../assets/aws-logo.png'
import gcpLogo from '../assets/gcp-logo.png'
import kubernetesLogo from '../assets/kubernetes-logo.png'
import azureLogo from '../assets/azure-logo.png'

const CLOUD_LOGO_BY_ARTIFACT_DEFINITIONS_MAP = {
  'massdriver/aws-iam-role': awsLogo,
  'massdriver/gcp-service-account': gcpLogo,
  'massdriver/kubernetes-cluster': kubernetesLogo,
  'massdriver/azure-service-principal': azureLogo
}

const CredentialsDropdown = ({
  loading,
  error,
  options,
  onChange,
  value,
  title,
  ...props
}) => (
  <FieldWrapper {...props}>
    {({ hasSchemaErrors, required, disabled }) =>
      loading ? (
        <LoadingContainer>
          <CircularProgress size={20} />
          <LoadingText>Loading Field...</LoadingText>
        </LoadingContainer>
      ) : options?.length > 0 ? (
        <AutocompleteField
          required={required}
          disabled={disabled}
          validationError={hasSchemaErrors}
          fullWidth
          value={loading ? '' : value}
          onChange={event => onChange && onChange(event.target.value)}
          label={title || 'Cloud Credentials'}
          options={options}
          noSearchOptionsText={
            <Typography variant='h6'>
              There are no cloud credentials matching that search text. Please
              search for something else.
            </Typography>
          }
          InputProps={{
            startAdornment: options.some(option => option.id === value) ? (
              <InputAdornment position='start' sx={{ mr: '0px' }}>
                <CloudIcon
                  src={
                    CLOUD_LOGO_BY_ARTIFACT_DEFINITIONS_MAP[
                    options.find(option => option.id === value).type
                    ]
                  }
                  alt={options.find(option => option.id === value).type}
                />
              </InputAdornment>
            ) : null
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option, value) => option.value === value,
            getOptionLabel: option =>
              options.find(opt => opt.value === option)?.label || '',
            filterOptions: (options, state) =>
              options.filter(option =>
                option?.label
                  ?.toLowerCase()
                  ?.includes(state.inputValue?.toLowerCase())
              ),
            renderOption: (props, option) => (
              <Stack
                direction='row'
                justifyContent='start'
                alignItems='center'
                spacing={1}
                {...props}
                key={option?.value}
              >
                {option?.type && (
                  <CloudIcon
                    src={CLOUD_LOGO_BY_ARTIFACT_DEFINITIONS_MAP[option?.type]}
                    alt={option?.type}
                  />
                )}
                <MenuText variant='h6' title={option?.name}>
                  {option?.name}
                </MenuText>
              </Stack>
            )
          }}
        />
      ) : (
        <EmptyContainer>
          <EmptyText>
            You have no cloud credentials configured with Massdriver.
          </EmptyText>
          <CredentialsButton
            variant='contained'
            fullWidth
            endIcon={<ExitToAppIcon />}
            href='/organization/credentials'
          >
            Take me to Configure a Cloud Credential
          </CredentialsButton>
        </EmptyContainer>
      )
    }
  </FieldWrapper>
)

CredentialsDropdown.propTypes = {
  cloud: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  title: PropTypes.string
}

export default CredentialsDropdown

const LoadingContainer = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px'
})

const LoadingText = stylin(Typography)({
  marginTop: '10px'
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

const EmptyContainer = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const CredentialsButton = stylin(Button)({
  mt: '4px',
  mb: '10px'
})

const EmptyText = stylin(Typography)({
  fontSize: '14px'
})
