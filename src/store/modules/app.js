import { setToken, getToken } from '@/utils/cookie'

const state = {
  sidebar: {
    opened: getToken('sidebarStatus') ? !!+getToken('sidebarStatus') : false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      setToken('sidebarStatus', '1')
    } else {
      setToken('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state) => {
    setToken('sidebarStatus', '0')
    state.sidebar.opened = true
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  /* 菜单状态 */
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  /* 关闭菜单 */
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  /* 设备类型 */
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
