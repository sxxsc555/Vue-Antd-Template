import cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: cookies.get('sidebarStatus') ? !!+cookies.get('sidebarStatus') : true
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      cookies.set('sidebarStatus', 1)
    } else {
      cookies.set('sidebarStatus', 0)
    }
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
