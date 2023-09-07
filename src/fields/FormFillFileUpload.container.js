import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { isObjectAndEmpty } from '../utils/data'
import FormFillFileUpload from './FormFillFileUpload'
import { stripDefaultValues } from './FormFillFileUpload.helpers'
import { useDropzone } from 'react-dropzone'
import jsyaml from 'js-yaml'

const VALID_FILE_TYPES = [
  'application/json',
  'text/json',
  'application/x-yaml',
  'text/x-yaml'
]

const EnhancedFormFillFileUpload = ({
  formData = {},
  onChange,
  schema,
  readOnly,
  disabled,
  ...props
}) => {
  const [errors, setErrors] = useState([])

  const { oldValues, newValues } = stripDefaultValues(
    formData,
    schema?.properties
  )

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0]
      const reader = new window.FileReader()
      reader.onload = () => {
        try {
          const binaryStr =
            file?.type?.split('/')?.[1] === 'json'
              ? JSON.parse(reader?.result)
              : jsyaml.load(reader.result)

          onChange({
            ...oldValues,
            ...binaryStr
          })
        } catch {
          setErrors(errors => [
            ...errors,
            `There was an issue parsing the file.`
          ])
        }
      }

      acceptedFiles?.length > 1
        ? setErrors(errors => [
          ...errors,
          `Dropzone only accepts single files.`
        ])
        : !VALID_FILE_TYPES?.includes(acceptedFiles?.[0]?.type)
          ? setErrors(errors => [
            ...errors,
            `Invalid file type. Dropzone only accepts '.json' and '.yaml' files.`
          ])
          : reader.readAsBinaryString(file)
    },
    [onChange, setErrors, oldValues]
  )

  const { getRootProps, getInputProps, isFocused, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      setErrors([])
      onDrop(acceptedFiles)
    },
    disabled: readOnly || disabled
  })

  const onRemoveFileClick = event => {
    event?.stopPropagation()
    onChange(oldValues)
  }

  return (
    <FormFillFileUpload
      errors={errors}
      hasFile={!isObjectAndEmpty(newValues)}
      title={schema?.title}
      onRemoveFileClick={onRemoveFileClick}
      schema={schema}
      rootProps={getRootProps()}
      inputProps={getInputProps()}
      isFocused={isFocused}
      isDragActive={isDragActive}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      {...props}
    />
  )
}

EnhancedFormFillFileUpload.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}

export default EnhancedFormFillFileUpload
