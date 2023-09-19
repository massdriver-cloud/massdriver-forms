
const withServices = (Component, services) => (props) => (
  <Component services={services} {...props} />
)

export default withServices
