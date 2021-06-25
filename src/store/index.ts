import { createStore } from 'vuex'
import getters from './getters'
import user, { userTypes } from './modules/user'
import app, { appTypes } from './modules/app'

export interface rootState {
  appStore: appTypes,
  userStore: userTypes
}

const store = createStore({
  modules: {
    user,
    app
  },
  getters
})

export default store
