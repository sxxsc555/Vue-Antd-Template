import { ActionTree } from 'vuex'
import { setToken, getToken, removeToken } from '@/utils/cookie'
import { resetRouter } from '@/router'
import { rootState } from '@/store'

export interface userTypes {
  token: string | undefined
}

const state: userTypes = {
  token: getToken('token')
}

const mutations = {
  SET_TOKEN: (state: userTypes, token: string) => {
    state.token = token
  },
  RESET_STATE: (state: userTypes) => {
    Object.assign(state, state)
  }
}

const actions: ActionTree<userTypes, rootState> = {
  /* 登录 */
  login({ commit }, userInfo: { username: string }) {
    const { username } = userInfo

    return new Promise<void>((resolve, reject) => {
      commit('SET_TOKEN', username)
      setToken('token', username)
      resolve()
    })
  },

  /* 注销 */
  logout({ commit, state }) {
    return new Promise<void>((resolve, reject) => {
      if (state.token) {
        removeToken('token')
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
