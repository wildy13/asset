export const state = () => ({
  currency: [],
  loading: false
})

export const mutations = {
  setCurrency (state, currency) {
    state.currency = currency
  },
  deleteCurrency (state, data) {
    const index = state.currency.findIndex(u => u.id === data[0].id)
    state.currency.splice(index, 1)
  },
  updateList (state, res) {
    state.currency.push(res.data)
  },
  updateCurrency (state, res) {
    const index = state.currency.findIndex(u => u.id === res.id)
    Object.assign(state.currency[index], res)
  }
}

export const getters = {
  getCurrency: state => state.currency,
  getLoading: state => state.loading
}

export const actions = {
  async inputCurrency ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/currency', payload)
    commit('updateList', res)
  },
  async fetchCurrency ({ commit }) {
    const res = await this.$axios.$get('/api/utility/currency')
    commit('setCurrency', res)
  },
  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/currency/delete', { data: { payload } })
    commit('deleteCurrency', res)
  },
  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/utility/currency/${payload.id}`, payload)
    commit('updateCurrency', res)
  }
}
