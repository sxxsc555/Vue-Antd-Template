import { ActionTree } from 'vuex'
import { setToken, getToken } from '@/utils/cookie'
import { rootState } from '@/store'

export interface appTypes {
  sidebar: { opened: boolean },
  device: string
}

const state: appTypes = {
  sidebar: {
    opened: getToken('sidebarStatus') ? !!+getToken('sidebarStatus') : false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: (state: appTypes) => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      setToken('sidebarStatus', '1')
    } else {
      setToken('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state: appTypes) => {
    setToken('sidebarStatus', '0')
    state.sidebar.opened = true
  },
  TOGGLE_DEVICE: (state: appTypes, device: string) => {
    state.device = device
  }
}

const actions: ActionTree<appTypes, rootState> = {
  /* 菜单状态 */
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  /* 关闭菜单 */
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  /* 设备类型 */
  toggleDevice({ commit }, device: string) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
