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

  return {
    ...defaultServices,
    ...suppliedServices
  }
}

export default createServices
