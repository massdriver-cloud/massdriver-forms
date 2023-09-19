import PropTypes from 'prop-types'
import FieldWrapper from './FieldWrapper'
import TextField from '../components/TextField'
import InputAdornment from '@mui/material/InputAdornment'

const Slug = ({ value, formData, onChange, uiSchema, schema, ...props }) => (
  <FieldWrapper schema={schema} uiSchema={uiSchema} {...props}>
    {({ hasSchemaErrors, required, disabled }) => (
      <TextField
        required={required}
        disabled={disabled}
        fullWidth
        error={hasSchemaErrors}
        value={formData || value || ''}
        onChange={event => onChange(event.target.value)}
        label={schema?.title || 'Abbreviation'}
        placeholder={uiSchema['ui:placeholder'] || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ mr: '0px' }} position='start'>
              {uiSchema?.slugPrefix}
            </InputAdornment>
          )
        }}
      />
    )}
  </FieldWrapper>
)

export default Slug

Slug.propTypes = {
  value: PropTypes.string,
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  uiSchema: PropTypes.object,
  schema: PropTypes.object
}
