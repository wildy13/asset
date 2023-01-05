export const state = () => ({
  assets: [],
  loading: false
})

export const mutations = {
  setAssets (state, assets) {
    state.assets = assets
  },
  deleteAssets (state, data) {
    const index = state.assets.findIndex(u => u.id === data[0].id)
    state.assets.splice(index, 1)
  },
  updateList (state, res) {
    state.assets.push(res)
  },
  updateAssets (state, res) {
    const index = state.assets.findIndex(u => u.id === res.id)
    Object.assign(state.assets[index], res)
  }
}

export const getters = {
  getAssets: state => state.assets,
  getLoading: state => state.loading
}

export const actions = {
  async inputAssets ({ commit }, payload) {
    const res = await this.$axios.$post('/api/asset', payload)
    commit('updateList', res)
  },
  async fetchAssets ({ commit }) {
    const res = await this.$axios.$get('/api/asset')
    commit('setAssets', res)
  },
  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('/api/asset/delete', { data: { payload } })
    commit('deleteAssets', res)
  },
  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`/api/asset/${payload.id}`, payload)
    commit('updateAssets', res)
  },

  async fetchPdf ({ commit }) {
    const res = await this.$axios.$get('/api/asset/download')
    return res
  }
}
