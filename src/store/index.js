import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'

const store = createStore({
  modules: {
    user,
    app
  },
  getters
})

export default store
