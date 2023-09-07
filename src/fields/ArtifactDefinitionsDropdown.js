import PropTypes from 'prop-types'
import FieldWrapper from './FieldWrapper'
import AutocompleteField from '../components/AutocompleteField'

import Typography from '@mui/material/Typography'

const ArtifactDefinitionsDropdown = ({
  loading,
  error,
  options,
  value,
  onChange,
  title,
  ...props
}) => (
  <FieldWrapper {...props}>
    {({ hasSchemaErrors, required, disabled }) => (
      <AutocompleteField
        options={options}
        noOptionsText={
          <Typography variant='h6'>
            There are no artifact definitions available.
          </Typography>
        }
        noSearchOptionsText={
          <Typography variant='h6'>
            There are no artifact definitions matching that search
            text. Please search for something else.
          </Typography>
        }
        required={required}
        disabled={disabled}
        loading={loading}
        loadingError={error}
        errorText={
          <Typography variant='h6'>
            There was an issue fetching your artifact definitions.
          </Typography>
        }
        validationError={hasSchemaErrors}
        fullWidth
        value={loading ? '' : value}
        onChange={event => onChange && onChange(event.target.value)}
        label={title || 'Artifact Definitions'}
        autocompleteProps={{
          isOptionEqualToValue: (option, value) => option.value === value,
          getOptionLabel: option =>
            typeof option === 'string'
              ? options.find(opt => opt.value === option)?.label || ''
              : option.label,
          filterOptions: (options, state) =>
            options.filter(option =>
              option?.label
                ?.toLowerCase()
                ?.includes(state.inputValue?.toLowerCase())
            )
        }}
      />
    )}
  </FieldWrapper>
)

ArtifactDefinitionsDropdown.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  artifactDefinitions: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default ArtifactDefinitionsDropdown
