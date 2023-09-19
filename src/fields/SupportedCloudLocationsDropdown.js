import PropTypes from 'prop-types'
import stylin from '../utils/stylin'
import FieldWrapper from './FieldWrapper'

import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const SupportedCloudLocationsDropdown = ({
  error,
  loading,
  value,
  onChange,
  cloudService,
  supportedLocations,
  title,
  ...props
}) => (
  <FieldWrapper {...props}>
    {({ hasSchemaErrors, required, disabled }) => (
      <TextField
        required={required}
        disabled={disabled}
        select
        fullWidth
        value={loading ? '' : value}
        onChange={event =>
          event?.target?.value && onChange && onChange(event.target.value)
        }
        label={title || 'Location'}
      >
        {loading ? (
          <LoadingContainer>
            <CircularProgress size={20} />
          </LoadingContainer>
        ) : error || !cloudService ? (
          <Typography variant='h6'>
            There was an issue fetching possible cloud locations.
          </Typography>
        ) : supportedLocations?.length > 0 ? (
          supportedLocations?.map(location => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>
            There are no supported locations for this cloud service.
          </Typography>
        )}
      </TextField>
    )}
  </FieldWrapper>
)

SupportedCloudLocationsDropdown.propTypes = {
  error: PropTypes.bool,
  loading: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  cloudService: PropTypes.string,
  supportedLocations: PropTypes.array,
  title: PropTypes.string
}

export default SupportedCloudLocationsDropdown

const LoadingContainer = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
