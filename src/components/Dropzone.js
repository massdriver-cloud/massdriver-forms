import stylin from '../utils/stylin'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import UploadFileIcon from '@mui/icons-material/UploadFile'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'

const Dropzone = ({
  rootProps,
  inputProps,
  isFocused,
  isDragActive,
  hasErrors,
  onRemoveAllFilesClick,
  onRemoveFileClick,
  hasMaxFiles,
  files,
  max,
  disabled
}) => (
  <DropzoneContainer
    {...rootProps}
    isFocused={isFocused}
    hasErrors={hasErrors}
    disabled={disabled}
    isDragActive={isDragActive}
    hasMaxFiles={hasMaxFiles}
  >
    <input {...inputProps} />
    <FileUploadBox>
      {hasMaxFiles ? (
        <CheckCircleOutlineIcon sx={{ width: '50px', height: '50px' }} />
      ) : isDragActive ? (
        <FileDownloadIcon sx={{ width: '50px', height: '50px' }} />
      ) : (
        <UploadFileIcon sx={{ width: '50px', height: '50px' }} />
      )}
      <UploadMessage>
        {hasMaxFiles
          ? `${max <= 1 ? 'File' : 'Files'} Successfully Added!`
          : isDragActive
            ? `Drop your file${max <= 1 ? '' : 's'} here to add.`
            : `Drag your file${max <= 1 ? '' : 's'} here, or click to select ${max < 1 ? 'a file' : 'files'
            } manually.`}
      </UploadMessage>
      <FileList>
        {files?.map((file, index) => (
          <FileContainer key={`${file?.path}-${index}`}>
            <FileText
              title={file?.path}
              onClick={event => event.stopPropagation()}
            >
              {file?.path}
            </FileText>
            <RemoveFileButton
              id={`${file?.path}-${index}`}
              disableRipple
              disableFocusRipple
              onClick={onRemoveFileClick}
            >
              <CloseIcon
                sx={{
                  height: '16px',
                  width: '16px'
                }}
              />
            </RemoveFileButton>
          </FileContainer>
        ))}
      </FileList>
      {hasMaxFiles && (
        <RemoveAllFilesButton
          variant='contained'
          onClick={onRemoveAllFilesClick}
        >
          {max <= 1 ? 'Remove File' : 'Remove All Files'}
        </RemoveAllFilesButton>
      )}
    </FileUploadBox>
  </DropzoneContainer>
)

export default Dropzone

const DropzoneContainer = stylin('div', [
  'isFocused',
  'hasErrors',
  'disabled',
  'isDragActive',
  'hasMaxFiles'
])(({ isFocused, hasErrors, disabled, isDragActive, hasMaxFiles }) => ({
  mt: '4px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: '6px',
  borderColor: '#cdced1',
  borderStyle: 'dashed',
  backgroundColor: '#efeff1',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out, color .24s ease-in-out',
  cursor: 'pointer',
  minHeight: '140px',
  '&:hover': {
    borderColor: '#2196f3',
    color: '#223354'
  },
  ...(hasMaxFiles
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

const RemoveAllFilesButton = stylin(Button)({
  mt: '16px',
  pointerEvents: 'auto',
  height: '26px'
})

const UploadMessage = stylin(Typography)({
  mt: '20px'
})

const FileContainer = stylin(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '120px',
  height: '20px',
  borderRadius: '4px',
  px: '6px',
  py: '2px',
  backgroundColor: 'white',
  pointerEvents: 'auto',
  color: '#223354',
  opacity: '0.7',
  my: '4px',
  cursor: 'auto',
  mx: '4px'
})

const RemoveFileButton = stylin(IconButton)({
  color: '#bdbdbd',
  height: '16px',
  width: '16px',
  ml: '5px',
  cursor: 'pointer',
  '&:hover': {
    color: '#223354'
  }
})

const FileList = stylin(Box)({
  mt: '10px',
  pointerEvents: 'none',
  flexWrap: 'wrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const FileText = stylin(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})
