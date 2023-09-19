import stylin from '../utils/stylin'
import FieldWrapper from './FieldWrapper'
import GenericFormFillFileUpload from '../components/FormFillFileUpload'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const FormFillFileUpload = ({
  rootProps,
  inputProps,
  isFocused,
  isDragActive,
  errors,
  title,
  onRemoveFileClick,
  hasFile,
  ...props
}) => (
  <FieldWrapper otherErrors={errors} {...props}>
    {({ hasSchemaErrors, required, disabled }) => (
      <FieldContainer>
        <Title disabled={disabled}>{`${title}${required ? '*' : ''}`}</Title>
        <GenericFormFillFileUpload
          hasErrors={hasSchemaErrors || errors?.length > 0}
          rootProps={rootProps}
          inputProps={inputProps}
          isFocused={isFocused}
          isDragActive={isDragActive}
          onRemoveFileClick={onRemoveFileClick}
          hasFile={hasFile}
          disabled={disabled}
        />
      </FieldContainer>
    )}
  </FieldWrapper>
)

export default FormFillFileUpload

const FieldContainer = stylin(Box)({
  py: '10px'
})

const Title = stylin(Typography, ['disabled'])(({ disabled }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '1.334',
  ...(disabled
    ? {
      color: '#cdced1'
    }
    : {})
}))
