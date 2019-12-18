import setUpBlockchainEnvironment from '@/helpers/getBlockchainEnv'

// Getting the correct environment. values: main | test
const environment = setUpBlockchainEnvironment('main')

export const state = () => ({
  users: [],
  wavesBaseURL: environment.baseUrl,
  dAppAddress: environment.dAppAddress,
  categories: ['ambassador', 'active contributor', 'community participants'],
  wavesDecimal: 1e8
})

export const getters = {
  verifiedUsers(state) {
    if (!state.users.length) return
    const users = state.users.map((user) => {
      const info = user.value.split('__')
      const key = user.key.split('__')
      return {
        info: JSON.parse(info[0]),
        category: info[1],
        status: info[2],
        publicKey: key[0]
      }
    })
    return users.filter((user) => user.status === 'verified') || []
  }
}
export const mutations = {
  LOAD_USERS(state, payload) {
    state.users = payload
  }
}

export const actions = {
  fetchUsers(context) {
    const regex = '.*?__user$'
    return this.$axios
      .$get(
        `${context.state.wavesBaseURL}${context.state.dAppAddress}?matches=${regex}`
      )
      .then((payload) => {
        context.commit('LOAD_USERS', payload)
      })
      .catch((_) => {})
  }
}
