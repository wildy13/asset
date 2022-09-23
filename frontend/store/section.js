export const state = () => ({
  sections: [],
  loading: false
})

export const mutations = {
  setSection (state, sections) {
    state.sections = sections
  },
  updateList (state, res) {
    state.sections.push(res.data)
  },

  deleteSections (state, res) {
    const index = state.sections.findIndex(u => u.id === res[0].id)
    state.sections.splice(index, 1)
  },

  updateSections (state, res) {
    const index = state.sections.findIndex(u => u.id === res.id)
    Object.assign(state.sections[index], res)
  }
}

export const getters = {
  getSections: state => state.sections,
  getLoading: state => state.loading
}

export const actions = {
  async inputSection ({ commit }, payload) {
    const res = await this.$axios.$post('api/section', payload)
    commit('updateList', res)
  },
  async getSection ({ commit }, payload) {
    const res = await this.$axios.$get('api/section', payload)
    commit('setSection', res)
  },
  async fetchSection ({ commit }, payload) {
    const res = await this.$axios.$post('api/section/filter', payload)
    commit('setSection', res)
  },

  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('api/section/delete', { data: { payload } })
    commit('deleteSections', res)
  },

  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/section/${payload.id}`, payload)
    commit('updateSections', res)
  }
}
