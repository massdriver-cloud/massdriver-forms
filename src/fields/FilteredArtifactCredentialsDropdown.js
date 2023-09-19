import PropTypes from 'prop-types'
import stylin from '../utils/stylin'
import FieldWrapper from './FieldWrapper'

import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const FilteredArtifactCredentialsDropdown = ({
  loading,
  value,
  onChange,
  title,
  error,
  cloudType,
  sortedArtifacts,
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
        label={title || 'Credentials'}
      >
        {loading ? (
          <LoadingContainer>
            <CircularProgress size={20} />
          </LoadingContainer>
        ) : error || !cloudType ? (
          <Typography variant='h6'>
            There was an issue fetching your credentials.
          </Typography>
        ) : sortedArtifacts.length > 0 ? (
          sortedArtifacts.map(({ name, id }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>
            Your organization does not have any artifact credentials
            for this cloud service.
          </Typography>
        )}
      </TextField>
    )}
  </FieldWrapper>
)

FilteredArtifactCredentialsDropdown.propTypes = {
  loading: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  cloudType: PropTypes.string,
  sortedArtifacts: PropTypes.array,
  title: PropTypes.string,
  error: PropTypes.bool
}

export default FilteredArtifactCredentialsDropdown

const LoadingContainer = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
