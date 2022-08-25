export default {
  async login ({commit}, payload) {
    await this.$auth.loginWith('local', {data: payload})
      .then((rep) => {
        commit('HIDE_MODAL')
        this.$toast.success('Successfully authenticated')
      })
      .catch ((err) => {
        this.$toast.error(`${err.response.data.message}`)
      })
  },
  async register ({commit}, payload) {
    await this.$axios.$post('register', payload)
      .then (() => {
        commit('TOGGLE_FIELD')
        this.$toast.success('Successfully authenticated')
      })
      .catch((err) => {
        this.$toast.error(`${err.response.data.message}`)
      })
  },
  async logout () {
    return this.$auth.logout()
  }
}
