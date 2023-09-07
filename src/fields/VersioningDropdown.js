import PropTypes from 'prop-types'
import FieldWrapper from './FieldWrapper'
import semverUtil from '../utils/semver'
import { isTruthyString } from '../utils/string'

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const VersioningDropdown = ({
  pastValue,
  value,
  onChange,
  versions,
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
        value={value}
        onChange={event =>
          event?.target?.value && onChange && onChange(event.target.value)
        }
        label={title || 'Version'}
      >
        {versions?.length > 0 ? (
          versions?.map(version => (
            <MenuItem
              key={version}
              value={version}
              disabled={
                isTruthyString(pastValue) && semverUtil?.lt(version, pastValue)
              }
            >
              {version}
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>There are no versions provided.</Typography>
        )}
      </TextField>
    )}
  </FieldWrapper>
)

VersioningDropdown.propTypes = {
  pastValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  versions: PropTypes.array,
  title: PropTypes.string
}

export default VersioningDropdown
