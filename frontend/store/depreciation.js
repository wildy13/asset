export const state = () => ({
  depreciation: [],
  loading: false
})

export const mutations = {
  setDepreciation (state, depreciation) {
    state.depreciation = depreciation
  },
  deleteDepreciation (state, data) {
    const index = state.depreciation.findIndex(u => u.id === data[0].id)
    state.depreciation.splice(index, 1)
  },
  updateList (state, res) {
    state.depreciation.push(res.data)
  },
  updateDepreciation (state, res) {
    const index = state.depreciation.findIndex(u => u.id === res.id)
    Object.assign(state.depreciation[index], res)
  }
}

export const getters = {
  getDepreciation: state => state.depreciation,
  getLoading: state => state.loading
}

export const actions = {
  async inputDepreciation ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/depreciation', payload)
    commit('updateList', res)
  },
  async fetchDepreciation ({ commit }) {
    const res = await this.$axios.$get('/api/utility/depreciation')
    commit('setDepreciation', res)
  },
  async filterDepreciation ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/depreciation/filter', payload)
    commit('setDepreciation', res)
  },
  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/depreciation/delete', { data: { payload } })
    commit('deleteDepreciation', res)
  },
  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/utility/depreciation/${payload.id}`, payload)
    commit('updateDepreciation', res)
  }
}
