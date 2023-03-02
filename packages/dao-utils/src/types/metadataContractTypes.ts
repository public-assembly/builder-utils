import { HexString } from './wagmiTypes'

export interface MetadataProviderProps {
  children?: React.ReactNode
}

type Settings = {
  token: HexString
  projectURI: string
  description: string
  contractImage: string
  rendererBase: string
}

export interface MetadataReturnTypes {
  tokenAddress?: HexString
  metadataAddress?: HexString
  settings?: Settings
}
