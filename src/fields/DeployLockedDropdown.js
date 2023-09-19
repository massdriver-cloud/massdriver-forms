import PropTypes from 'prop-types'
import FieldWrapper from './FieldWrapper'
import { isTruthyString } from '../utils/string'

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const DeployLockedDropdown = ({
  pastValue,
  disableType,
  value,
  onChange,
  items,
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
        label={title || ''}
      >
        {items?.length > 0 ? (
          items.map(item => (
            <MenuItem
              key={item}
              value={item}
              disabled={
                isTruthyString(pastValue) &&
                (disableType === 'lower'
                  ? items?.indexOf(pastValue) < items?.indexOf(item)
                  : items?.indexOf(pastValue) > items?.indexOf(item))
              }
            >
              {item}
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>There are no items provided.</Typography>
        )}
      </TextField>
    )}
  </FieldWrapper>
)

DeployLockedDropdown.propTypes = {
  pastValue: PropTypes.string,
  disableType: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  versions: PropTypes.array,
  title: PropTypes.string
}

export default DeployLockedDropdown
