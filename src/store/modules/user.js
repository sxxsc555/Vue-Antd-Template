import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken()
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, state)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }

}

const actions = {
  // 登录
  login({ commit }, userinfo) {
    const { username, password } = userinfo
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === '123456') {
        commit('SET_TOKEN', username)
        setToken(username)
        resolve()
      } else {
        reject()
      }
    })
  },

  // 注销
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.token) {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      } else {
        reject()
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
