export function etherscanLink({
  linkType = 'tx',
  hash,
}: {
  linkType?: 'tx' | 'address' | 'contract'
  hash?: string
}) {
  if (process.env.NEXT_PUBLIC_CHAIN_ID == '1') {
    return `https://etherscan.io/tx/${hash}`
  } else if (process.env.NEXT_PUBLIC_CHAIN_ID == '5') {
    return `https://etherscan.io/tx/${hash}`
  } else if (process.env.NEXT_PUBLIC_CHAIN_ID == '999') {
    return `https://testnet.explorer.zora.energy/tx/${hash}`
  } else {
    return ''
  }
}
