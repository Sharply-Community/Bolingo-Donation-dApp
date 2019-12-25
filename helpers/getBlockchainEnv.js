export default function setUpBlockchainEnvironment(environment) {
  switch (environment) {
    case 'test':
      return {
        dAppAddress: '3N9EXJ2Y7szbSfrxUwhWxnL3zK8wf3xosDE',
        baseUrl: 'https://nodes-testnet.wavesnodes.com/addresses/data/'
      }
    case 'main':
      return {
        dAppAddress: '3P2NM3bGQMiV4dzY93WfedpHwcvNv9qRQNF',
        baseUrl: 'https://nodes.wavesnodes.com/addresses/data/'
      }
  }
}
