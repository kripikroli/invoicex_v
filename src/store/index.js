import { createStore } from 'vuex'
import authentication from './modules/authentication'
import signup from './modules/signup'
import login from './modules/login'

export default createStore({
  modules: {
    namespaced: true,
    
    authentication,
    signup,
    login
  }
})


