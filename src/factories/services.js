const createServices = (suppliedServices = {}) => {

  const defaultService = () => ({
    format: () => ({
      data: undefined,
      loading: false,
      error: {
        messages: [
          "No fetch service configured for this field."
        ]
      }
    })
  })

  const defaultServices = {
    getContainerRepositories: defaultService,
    getFilteredArtifactCredentials: defaultService,
    getSupportedCloudLocations: defaultService,
    getDnsZones: defaultService,
    getInstanceTypes: defaultService,
    getArtifactDefinitions: defaultService,
    getCredentials: defaultService,
  }

  const services = {
    ...defaultServices,
    ...suppliedServices
  }
  return services
  // return Object.keys(services).reduce((prev, cur) => ({
  //   ...prev,
  //   [cur]: (...variables) => {
  //     const { data, loading, error } = services[cur](...variables)

  //     error?.messages?.forEach(message => console.error(`@massdriver/forms - ${cur} service error - ${message}`))

  //     return { data, loading, error }
  //   }
  // }), {})
}

export default createServices
