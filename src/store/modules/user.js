import { setToken, getToken, removeToken } from '@/utils/cookie'
import { resetRouter } from '@/router'

const state = {
  token: getToken('token')
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  RESET_STATE: (state) => {
    Object.assign(state, state)
  }
}

const actions = {
  /* 登录 */
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', username)
      setToken('token', username)
      resolve()
    })
  },

  /* 注销 */
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      if(state.token) {
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