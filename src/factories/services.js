const createServices = (suppliedServices = {}) => {

  const defaultService = () => ({
    data: undefined,
    loading: false,
    error: {
      messages: [
        "No fetch service configured for this field."
      ]
    }
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
}

export default createServices
