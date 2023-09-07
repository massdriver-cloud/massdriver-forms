import PropTypes from 'prop-types'
import ContainerRepositoriesDropdown from './ContainerRepositoriesDropdown'

export const ContainerRepositoriesDropdownPreview = ({
  value,
  formData,
  onChange,
  schema,
  ...props
}) => (
  <ContainerRepositoriesDropdown
    loading={false}
    error={false}
    value={formData || value || ''}
    onChange={onChange}
    title={schema?.title}
    containerRepositories={[
      {
        name: 'Container Repository 1',
        id: '1'
      },
      {
        name: 'Container Repository 2',
        id: '2'
      },
      {
        name: 'Container Repository 3',
        id: '3'
      },
      {
        name: 'Container Repository 4',
        id: '4'
      },
      {
        name: 'Container Repository 5',
        id: '5'
      }
    ]}
    schema={schema}
    {...props}
  />
)

ContainerRepositoriesDropdownPreview.propTypes = {
  value: PropTypes.string,
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object
}

export default ContainerRepositoriesDropdownPreview
