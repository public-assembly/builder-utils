import { HexString } from './wagmiTypes'

export interface MetadataProviderProps {
  children?: React.ReactNode
}

type MetadataSettings = {
  token: HexString
  projectURI: string
  description: string
  contractImage: string
  rendererBase: string
}

export interface MetadataReturnTypes {
  tokenAddress?: HexString
  metadataAddress?: HexString
  metadataSettings?: MetadataSettings
}
