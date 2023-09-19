import stylin from '../utils/stylin'
import FieldWrapper from './FieldWrapper'
import GenericDropzone from '../components/Dropzone'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Dropzone = ({
  rootProps,
  inputProps,
  isFocused,
  isDragActive,
  errors,
  title,
  onRemoveAllFilesClick,
  onRemoveFileClick,
  hasMaxFiles,
  files,
  max,
  ...props
}) => (
  <FieldWrapper otherErrors={errors} {...props}>
    {({ hasSchemaErrors, required, disabled }) => (
      <FieldContainer>
        <Title disabled={disabled}>{`${title}${required ? '*' : ''}`}</Title>
        <GenericDropzone
          hasErrors={hasSchemaErrors || errors?.length > 0}
          rootProps={rootProps}
          inputProps={inputProps}
          isFocused={isFocused}
          isDragActive={isDragActive}
          onRemoveAllFilesClick={onRemoveAllFilesClick}
          onRemoveFileClick={onRemoveFileClick}
          hasMaxFiles={hasMaxFiles}
          disabled={disabled}
          files={files}
          max={max}
        />
      </FieldContainer>
    )}
  </FieldWrapper>
)

export default Dropzone

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
