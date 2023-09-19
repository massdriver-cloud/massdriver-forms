import FormFillFileUpload from './FormFillFileUpload.container'
import Dropzone from './Dropzone.container'
import ContainerRepositoriesDropdown from './ContainerRepositoriesDropdown.container'
import FilteredArtifactCredentialsDropdown from './FilteredArtifactCredentialsDropdown.container'
import SupportedCloudLocationsDropdown from './SupportedCloudLocationsDropdown.container'
import DnsZonesDropdown from './DnsZonesDropdown.container'
import Slug from './Slug'
import ConversionFieldTime from './ConversionFieldTime'
import ConversionFieldData from './ConversionFieldData'
import InstanceTypesDropdown from './InstanceTypesDropdown.container'
import ArtifactDefinitionsDropdown from './ArtifactDefinitionsDropdown.container'
import VersioningDropdown from './VersioningDropdown.container'
import CredentialsDropdown from './CredentialsDropdown.container'
import DeployLockedDropdown from './DeployLockedDropdown.container'

const fields = {
  formFillFileUpload: FormFillFileUpload,
  dropzone: Dropzone,
  containerRepositoriesDropdown: ContainerRepositoriesDropdown,
  filteredArtifactCredentialsDropdown: FilteredArtifactCredentialsDropdown,
  supportedCloudLocationsDropdown: SupportedCloudLocationsDropdown,
  slug: Slug,
  dnsZonesDropdown: DnsZonesDropdown,
  conversionFieldTime: ConversionFieldTime,
  conversionFieldData: ConversionFieldData,
  instanceTypesDropdown: InstanceTypesDropdown,
  artifactDefinitionsDropdown: ArtifactDefinitionsDropdown,
  versioningDropdown: VersioningDropdown,
  credentialsDropdown: CredentialsDropdown,
  deployLockedDropdown: DeployLockedDropdown
}

export default fields
