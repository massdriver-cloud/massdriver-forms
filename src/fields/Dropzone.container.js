import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Dropzone from './Dropzone'
import { useDropzone } from 'react-dropzone'
// import jsyaml from 'js-yaml'

// const isNonEmptyObject = obj =>
// obj
//   ? Object.keys(obj).reduce(
//     (acc, key) =>
//       acc || typeof obj[key] === 'object'
//         ? obj[key] === {}
//           ? false
//           : isNonEmptyObject(obj[key])
//         : true,
//     false
//   )
//   : false

const EnhancedDropzone = ({
  formData = [],
  onChange,
  uiSchema,
  schema,
  readOnly,
  disabled,
  ...props
}) => {
  const [errors, setErrors] = useState([])

  const { fileTypes, max } = uiSchema

  const onDrop = useCallback(
    acceptedFiles =>
      [...acceptedFiles, ...formData]?.length > max
        ? setErrors(errors => [
          ...errors,
          `Dropzone only accepts a maximum of ${max === 1 ? '1 file' : `${max} files`
          }.`
        ])
        : fileTypes?.length > 0 &&
          acceptedFiles?.some(file => !fileTypes?.includes(file?.type))
          ? setErrors(errors => [
            ...errors,
            `Dropzone only accepts files of the following types: ${fileTypes
              ?.map(type => `'${type}'`)
              ?.join(', ')}.`
          ])
          : onChange([...formData, ...acceptedFiles]),
    [onChange, setErrors, max, fileTypes]
  )

  const { getRootProps, getInputProps, isFocused, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      setErrors([])
      onDrop(acceptedFiles)
    },
    disabled: readOnly || disabled
  })

  const onRemoveAllFilesClick = event => {
    event?.stopPropagation()
    onChange()
  }

  const onRemoveFileClick = event => {
    event?.stopPropagation()
    onChange(
      formData?.filter(
        (file, index) => `${file?.name}-${index}` !== event?.currentTarget?.id
      )
    )
  }

  return (
    <Dropzone
      errors={errors}
      hasMaxFiles={formData?.length === max}
      title={schema?.title}
      onRemoveAllFilesClick={onRemoveAllFilesClick}
      onRemoveFileClick={onRemoveFileClick}
      schema={schema}
      uiSchema={uiSchema}
      rootProps={getRootProps()}
      inputProps={getInputProps()}
      isFocused={isFocused}
      isDragActive={isDragActive}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      max={max}
      files={formData}
      {...props}
    />
  )
}

EnhancedDropzone.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
}

export default EnhancedDropzone
