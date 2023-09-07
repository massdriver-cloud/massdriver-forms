import React from 'react'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { getTemplate, getUiOptions } from '@rjsf/utils'

/** NOTE
 *  This is an internal RJSF component that we have overriden to provide custom support.
 *  Be careful when touching anything in this file, as much of the code is used by RJSF internally.
 *
 *
 *  Treat this file as part of RJSF's internal Form implementation.
 */

/**
 * Overrides @rjsf/mui's FieldTemplate.
 *
 * Copies @rjsf/mui's FieldTemplate. The only change is to allow the rendering of custom descriptions (lines 71-78).
 */
const FieldTemplate = ({
  id,
  children,
  classNames,
  disabled,
  displayLabel,
  hidden,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  rawErrors = [],
  errors,
  help,
  description,
  rawDescription,
  schema,
  uiSchema,
  registry
}) => {
  const uiOptions = getUiOptions(uiSchema)
  const WrapIfAdditionalTemplate = getTemplate(
    'WrapIfAdditionalTemplate',
    registry,
    uiOptions
  )

  if (hidden) {
    return <div style={{ display: 'none' }}>{children}</div>
  }

  return (
    <WrapIfAdditionalTemplate
      classNames={classNames}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}
    >
      <FormControl
        fullWidth
        error={rawErrors.length ? true : false} //eslint-disable-line
        required={required}
        sx={{
          pl:
            schema?.type === 'object' && (id?.split('::').length - 1) * 5 <= 25
              ? `${id?.split('::').length * 5}px`
              : '0px'
        }}
      >
        {children}
        {displayLabel &&
          (description && rawDescription ? (
            description
          ) : rawDescription ? (
            <Typography variant='caption' color='textSecondary'>
              {rawDescription}
            </Typography>
          ) : null)}
        {errors}
        {help}
      </FormControl>
    </WrapIfAdditionalTemplate>
  )
}

export default FieldTemplate
