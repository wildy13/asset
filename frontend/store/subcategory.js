export const state = () => ({
  subcategory: [],
  loading: false
})

export const mutations = {
  setSubCategory (state, subcategory) {
    state.subcategory = subcategory
  },
  deleteSubCategory (state, data) {
    const index = state.subcategory.findIndex(u => u.id === data[0].id)
    state.subcategory.splice(index, 1)
  },
  updateList (state, res) {
    state.subcategory.push(res.data)
  },
  updateSubCategory (state, res) {
    const index = state.subcategory.findIndex(u => u.id === res.id)
    Object.assign(state.subcategory[index], res)
  }
}

export const getters = {
  getSubCategory: state => state.subcategory,
  getLoading: state => state.loading
}

export const actions = {
  async inputSubCategory ({ commit }, payload) {
    console.log(payload)
    const res = await this.$axios.$post('/api/utility/subCategory', payload)
    commit('updateList', res)
  },
  async fetchSubCategory ({ commit }) {
    const roles = await this.$axios.$get('/api/utility/subCategory')
    commit('setSubCategory', roles)
  },
  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/subCategory/delete', { data: { payload } })
    commit('deleteSubCategory', res)
  },
  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/utility/subCategory/${payload.id}`, payload)
    commit('updateSubCategory', res)
  }
}
