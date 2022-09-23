export const state = () => ({
  dapartments: [],
  loading: false
})

export const mutations = {
  setDapartments (state, dapartments) {
    state.dapartments = dapartments
  },
  updateList (state, res) {
    state.dapartments.push(res.data)
  },

  deleteDapartments (state, res) {
    const index = state.dapartments.findIndex(u => u.id === res[0].id)
    state.dapartments.splice(index, 1)
  },

  updateDapartments (state, res) {
    const index = state.dapartments.findIndex(u => u.id === res.id)
    Object.assign(state.dapartments[index], res)
  }
}

export const getters = {
  getDapartments: state => state.dapartments,
  getLoading: state => state.loading
}

export const actions = {
  async inputDapartment ({ commit }, payload) {
    const res = await this.$axios.$post('api/dapartment', payload)
    commit('updateList', res)
  },

  async fetchDapartment ({ commit }, payload) {
    const res = await this.$axios.$get('api/dapartment', payload)
    commit('setDapartments', res)
  },

  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('api/dapartment/delete', { data: { payload } })
    commit('deleteDapartments', res)
  },

  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/dapartment/${payload.id}`, payload)
    commit('updateDapartments', res)
  }
}
