export const state = () => ({
  users: []
})

export const getters = {
  verifiedUsers(state) {
    if (!state.users.length) return
    const users = state.users.map((user) => {
      const info = user.value.split('__')
      const key = user.key.split('__')
      return {
        info: JSON.parse(info[0]),
        status: info[1],
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
        `https://nodes-testnet.wavesnodes.com/addresses/data/3N9EXJ2Y7szbSfrxUwhWxnL3zK8wf3xosDE?matches=${regex}`
      )
      .then((payload) => {
        context.commit('LOAD_USERS', payload)
      })
      .catch((_) => {})
  }
}
