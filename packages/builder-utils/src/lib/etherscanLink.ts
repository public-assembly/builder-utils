export function etherscanLink({
  linkType = 'tx',
  hash,
}: {
  linkType?: 'tx' | 'address' | 'contract'
  hash?: string
}) {
  return `https://etherscan.io/tx/${hash}`
}
