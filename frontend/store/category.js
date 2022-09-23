export const state = () => ({
  category: [],
  loading: false
})

export const mutations = {
  setCategory (state, category) {
    state.category = category
  },
  deleteCategory (state, data) {
    const index = state.category.findIndex(u => u.id === data[0].id)
    state.category.splice(index, 1)
  },
  updateList (state, res) {
    state.category.push(res.data)
  },
  updateCategory (state, res) {
    const index = state.category.findIndex(u => u.id === res.id)
    Object.assign(state.category[index], res)
  }
}

export const getters = {
  getCategory: state => state.category,
  getLoading: state => state.loading
}

export const actions = {
  async inputCategory ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/category', payload)
    commit('updateList', res)
  },
  async fetchCategory ({ commit }) {
    const res = await this.$axios.$get('/api/utility/category')
    commit('setCategory', res)
  },
  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('/api/utility/category/delete', { data: { payload } })
    commit('deleteCategory', res)
  },
  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/utility/category/${payload.id}`, payload)
    commit('updateCategory', res)
  }
}
