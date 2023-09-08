# massdriver-forms

Massdriver's wrapper for RJSF.

## Getting Started

1. Run `npm install @massdriver/forms`

2. Create a new `Form.js` file.

3. Create a list of `services` to provide the Form. These services will be consumed by specific fields to populate them with data from a remote source.

4. Create a wrapper with your custom Form services configuration:

```
import createForm from '@massdriver/forms'

const Form = props => {

  const MassdriverForm = createForm({
    services: {
      // services go here
    }
  })

  return (
    <MassdriverForm {...props} />
  )
}
```

## Services

Here is an entire list of services and where they are consumed:

### getContainerRepositories

Consumed by: `containerRepositoriesDropdown`

```
/**
* @param {Object: { cloud: String }}
*
* @return {Object: {
*  data: [
*   {
*     cloud: String,
*     cloudProviderId: String,
*     location: String,
*     name: String
*   },
*   ...
* ],
* loading: Boolean,
* error: Undefined || {
*   messages: [message: String, ...]
* }
* }}
*/

// Example:

const getContainerRepositories(options) => {
  const {cloud} = options

  return {
    data: [
      {
        cloud: 'aws',
        cloudProviderId: '1',
        location: 'us-west',
        name: 'Repository 1'
      },
      {
        cloud: 'gcp',
        cloudProviderId: '2',
        location: 'us-east',
        name: 'Repository 2'
      }
    ],
    loading: false,
    error: undefined
  }
}

```

### getFilteredArtifactCredentials

Consumed by: `filteredArtifactCredentialsDropdown`

```
/**
* @param {Object: { type: String }}
*
* @return {Object: {
*  data: [
*   {
*     id: String,
*     name: String
*   },
*   ...
* ],
* loading: Boolean,
* error: Undefined || {
*   messages: [message: String, ...]
* }
* }}
*/

// Example:

const getFilteredArtifactCredentials(options) => {
  const {type} = options

  return {
    data: [
      {
        id: '1',
        name: 'Credential 1'
      },
      {
        id: '2',
        name: 'Credential 2'
      }
    ],
    loading: false,
    error: undefined
  }
}

```

### getSupportedCloudLocations

Consumed by: `supportedCloudLocationsDropdown`

```
/**
* @param {Object: { cloudService: String }}
*
* @return {Object: {
*  data: [location: String, ...],
* loading: Boolean,
* error: Undefined || {
*   messages: [message: String, ...]
* }
* }}
*/

// Example:

const getSupportedCloudLocations(options) => {
  const {cloudService} = options

  return {
    data: [
      "us-west",
      "us-east"
    ],
    loading: false,
    error: undefined
  }
}

```

### getDnsZones

Consumed by: `dnsZonesDropdown`

```
/**
* @param {Object: { cloud: String }}
*
* @return {Object: {
*  data: [
*   {
*     cloud: String,
*     cloudProviderId: String,
*     location: String,
*     name: String,
*     id: String
*   },
*   ...
* ],
* loading: Boolean,
* error: Undefined || {
*   messages: [message: String, ...]
* }
* }}
*/

// Example:

const getDnsZones(options) => {
  const {cloud} = options

  return {
    data: [
      {
        cloud: 'aws',
        cloudProviderId: '1',
        location: 'us-west',
        name: 'DNS Zone 1',
        id: '1'
      },
      {
        cloud: 'gcp',
        cloudProviderId: '2',
        location: 'us-east',
        name: 'DNS Zone 2',
        id: '2'
      }
    ],
    loading: false,
    error: undefined
  }
}

```

### getInstanceTypes

Consumed by: `instanceTypesDropdown`

```
/**
* @param {Object: {
*   manifestId: String,
*   targetId: String,
*   query: String,
*   service: String
* }}
*
* @return {Object: {
*  data: [
*   {
*     name: String,
*     size: String,
*     iops: String,
*     vCpus: String,
*     memoryGB: String
*   },
*   ...
* ],
* loading: Boolean,
* error: Undefined || {
*   messages: [message: String, ...]
* }
* }}
*/

// Example:

const getInstanceTypes(options) => {
  const {manifestId, targetId, query, service} = options

  return {
    data: [
      {
        name: 'GP_Standard_D2ds_v4',
        size: 'D2ds',
        iops: '3200',
        vCpus: '2',
        memoryGB: '8'
      },
      {
        name: 'GP_Standard_D4ds_v4',
        size: 'D4ds',
        iops: '6400',
        vCpus: '4',
        memoryGB: '16'
      },
    ],
    loading: false,
    error: undefined
  }
}

```

### getArtifactDefinitions

Consumed by: `artifactDefinitionsDropdown`

```
/**
* @param {Object: {
*   filter: {
*     isCredential: Boolean,
*     service: String
*   }
* }}
*
* @return {Object: {
*  data: [
*   {
*     name: String,
*     id: String
*   },
*   ...
* ],
* loading: Boolean,
* error: Undefined || {
*   messages: [message: String, ...]
* }
* }}
*/

// Example:

const getArtifactDefinitions(options) => {
  const {filter} = options

  return {
    data: [
      {
        name: 'massdriver/aws-api-gateway',
        id: '1'
      },
      {
        name: 'massdriver/aws-vpc',
        id: '2'
      },
    ],
    loading: false,
    error: undefined
  }
}

```

### getCredentials

Consumed by: `credentialsDropdown`

```
/**
* @param {}
*
* @return {Object: {
*  data: [
*   {
*     type: String,
*     name: String,
*     id: String
*   },
*   ...
* ],
* loading: Boolean,
* error: Undefined || {
*   messages: [message: String, ...]
* }
* }}
*/

// Example:

const getCredentials(options) => {
  const {filter} = options

  return {
    data: [
      {
        name: 'AWS Credential',
        type: 'massdriver/aws-iam-role',
        id: '1'
      },
      {
        name: 'GCP Credential',
        type: 'massdriver/gcp-service-account',
        id: '2'
      },
    ],
    loading: false,
    error: undefined
  }
}

```
