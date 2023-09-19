import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { schemaRequiresTrueValue } from '@rjsf/utils'

/** NOTE
 *  This is an internal RJSF component that we have overriden to provide custom support.
 *  Be careful when touching anything in this file, as much of the code is used by RJSF internally.
 *
 *
 *  Treat this file as part of RJSF's internal Form implementation.
 */

const CheckboxWidget = ({
  schema,
  id,
  value,
  disabled,
  readonly,
  label,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  registry
}) => {
  const DescriptionFieldTemplate = registry?.templates?.DescriptionFieldTemplate
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  const required = schemaRequiresTrueValue(schema)

  const _onChange = (_, checked) => onChange(checked)
  const _onBlur = ({ target: { value } }) => onBlur(id, value)
  const _onFocus = ({ target: { value } }) => onFocus(id, value)

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            name={id}
            checked={typeof value === 'undefined' ? false : Boolean(value)}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
          />
        }
        label={label || ''}
      />
      {DescriptionFieldTemplate && schema?.description ? (
        <DescriptionFieldTemplate
          description={schema?.description}
          id={`${id}__description`}
        />
      ) : schema?.description ? (
        <Typography
          id={`${id}__description`}
          variant='caption'
          color='textSecondary'
        >
          {schema?.description}
        </Typography>
      ) : null}
    </>
  )
}

export default CheckboxWidget
