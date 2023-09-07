import stylin from '../utils/stylin'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const FieldWrapper = ({
  children,
  registry,
  schema,
  errorSchema,
  rawErrors,
  required,
  disabled,
  readonly,
  otherErrors,
  ...props
}) => {
  const DescriptionFieldTemplate = registry?.templates?.DescriptionFieldTemplate

  return (
    <>
      {typeof children === 'function'
        ? children({
          hasSchemaErrors:
            errorSchema?._errors?.length > 0 || rawErrors?.length > 0,
          required,
          disabled: readonly || disabled
        })
        : children}
      {DescriptionFieldTemplate ? (
        <DescriptionFieldTemplate description={schema?.description} />
      ) : (
        <Typography variant='subtitle3'>{schema?.description}</Typography>
      )}
      {(errorSchema?._errors || otherErrors) && (
        <ErrorList>
          {[...(errorSchema?._errors || []), ...(otherErrors || [])].map(
            error => (
              <ErrorListItem key={error}>
                <ErrorListText>{error}</ErrorListText>
              </ErrorListItem>
            )
          )}
        </ErrorList>
      )}
    </>
  )
}

export default FieldWrapper

const ErrorList = stylin(List)({
  p: 0
})

const ErrorListItem = stylin(ListItem)({
  px: 0,
  py: `4px`
})

const ErrorListText = stylin(Typography)({
  color: 'error.main',
  fontWeight: 'bold',
  fontSize: '13px',
  lineHeight: 1.66,
  mx: '8px',
  mt: '3px'
})
