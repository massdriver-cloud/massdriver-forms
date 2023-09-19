import stylin from '../utils/stylin'
import FieldWrapper from './FieldWrapper'
import { isTruthyString } from '../utils/string'

import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const InstanceTypesDropdown = ({
  loading,
  error,
  instanceTypes,
  value,
  onChange,
  uiSchema,
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
        label={title || 'Instance Type'}
      >
        {loading ? (
          <LoadingContainer>
            <CircularProgress size={20} />
          </LoadingContainer>
        ) : error ? (
          <Typography variant='h6'>
            There was an issue fetching your instance types.
          </Typography>
        ) : instanceTypes?.length > 0 ? (
          instanceTypes?.map(({ name, iops, vCpus, memoryGB }) => (
            <MenuItem key={name} value={name}>
              <MenuText variant='h6' title={title}>
                {`${name} (${isTruthyString(vCpus) ? `${vCpus} vCores` : ''}${isTruthyString(memoryGB) ? `, ${memoryGB} GiB memory` : ''
                  }${isTruthyString(iops) ? `, ${iops} max iops` : ''})`}
              </MenuText>
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>
            Compute for this service is not available in this region.
          </Typography>
        )}
      </TextField>
    )}
  </FieldWrapper>
)

export default InstanceTypesDropdown

const LoadingContainer = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const MenuText = stylin(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})
