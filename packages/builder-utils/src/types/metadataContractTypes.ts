import { Hex } from './misc'

export interface MetadataProviderProps {
  children?: React.ReactNode
}

type MetadataSettings = {
  token: Hex
  projectURI: string
  description: string
  contractImage: string
  rendererBase: string
}

export interface MetadataReturnTypes {
  tokenAddress?: Hex
  metadataAddress?: Hex
  metadataSettings?: MetadataSettings
}
