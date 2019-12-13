function blockchainEnvGenerator(
  dApp = '3N9EXJ2Y7szbSfrxUwhWxnL3zK8wf3xosDE',
  baseUrl = 'https://nodes-testnet.wavesnodes.com'
) {
  return {
    dApp,
    baseUrl,
    endpoint: `${baseUrl}/addresses/data/${dApp}`
  }
}
function getBlockchainEnv(networkAlias = 'T') {
  switch (networkAlias) {
    case 'T':
      blockchainEnvGenerator()
      break
    case 'W':
      blockchainEnvGenerator()
      break
  }
}

export default getBlockchainEnv
