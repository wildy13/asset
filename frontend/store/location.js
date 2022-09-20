export const state = () => ({
  location: [],
  loading: false
})

export const mutations = {
  setLocation (state, location) {
    state.location = location
  },
  deleteLocation (state, data) {
    const index = state.location.findIndex(u => u.id === data[0].id)
    state.location.splice(index, 1)
  },
  updateList (state, res) {
    state.location.push(res.data)
  },
  updateLocation (state, res) {
    const index = state.location.findIndex(u => u.id === res.id)
    Object.assign(state.location[index], res)
  }
}

export const getters = {
  getLocation: state => state.location,
  getLoading: state => state.loading
}

export const actions = {
  async inputLocation ({ commit }, payload) {
    console.log(payload)
    const res = await this.$axios.$post('/api/utility/location', payload)
    commit('updateList', res)
  },
  async fetchLocation ({ commit }) {
    const roles = await this.$axios.$get('/api/utility/location')
    commit('setLocation', roles)
  },
  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/location/delete', { data: { payload } })
    commit('deleteLocation', res)
  },
  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/utility/location/${payload.id}`, payload)
    commit('updateLocation', res)
  }
}
