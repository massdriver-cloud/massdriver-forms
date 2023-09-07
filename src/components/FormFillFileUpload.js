import stylin from '../utils/stylin'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import UploadFileIcon from '@mui/icons-material/UploadFile'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const FormFillFileUpload = ({
  rootProps,
  inputProps,
  isFocused,
  isDragActive,
  hasErrors,
  onRemoveFileClick,
  hasFile,
  disabled
}) => (
  <FormFillFileUploadContainer
    {...rootProps}
    isFocused={isFocused}
    hasErrors={hasErrors}
    disabled={disabled}
    isDragActive={isDragActive}
    hasValue={hasFile}
  >
    <input {...inputProps} />
    <FileUploadBox>
      {hasFile ? (
        <CheckCircleOutlineIcon sx={{ width: '35px', height: '35px' }} />
      ) : isDragActive ? (
        <FileDownloadIcon sx={{ width: '35px', height: '35px' }} />
      ) : (
        <UploadFileIcon sx={{ width: '35px', height: '35px' }} />
      )}
      <UploadMessage>
        {hasFile
          ? 'File Successfully Added!'
          : isDragActive
            ? `Drop your file here to add.`
            : `Drag your file here, or click to select a file manually.`}
      </UploadMessage>
      {hasFile && (
        <RemoveFileButton variant='contained' onClick={onRemoveFileClick}>
          Remove File
        </RemoveFileButton>
      )}
    </FileUploadBox>
  </FormFillFileUploadContainer>
)

export default FormFillFileUpload

const FormFillFileUploadContainer = stylin('div', [
  'isFocused',
  'hasErrors',
  'disabled',
  'isDragActive',
  'hasValue'
])(({ isFocused, hasErrors, disabled, isDragActive, hasValue }) => ({
  mt: '4px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: '6px',
  borderColor: '#cdced1',
  borderStyle: 'dashed',
  backgroundColor: '#efeff1',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out, color .24s ease-in-out',
  cursor: 'pointer',
  minHeight: '60px',
  '&:hover': {
    borderColor: '#2196f3',
    color: '#223354'
  },
  ...(hasValue
    ? {
      pointerEvents: 'none',
      cursor: 'auto'
    }
    : {}),
  ...(isFocused || isDragActive
    ? {
      borderColor: '#2196f3',
      color: '#223354'
    }
    : {}),
  ...(hasErrors
    ? {
      borderColor: 'error.main'
    }
    : {}),
  ...(disabled
    ? {
      borderColor: '#dce4ef',
      borderStyle: 'dashed',
      backgroundColor: '#fcfeff',
      color: '#dce4ef',
      pointerEvents: 'none'
    }
    : {})
}))

const FileUploadBox = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%'
})

const RemoveFileButton = stylin(Button)({
  mt: '16px',
  pointerEvents: 'auto',
  height: '26px'
})

const UploadMessage = stylin(Typography)({
  mt: '20px'
})
