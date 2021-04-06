import { createStore } from 'vuex'
import authentication from './modules/authentication'
import signup from './modules/signup'
import login from './modules/login'
import clients from './modules/clients'
import client from './modules/client'
import team from './modules/team'
import invoices from './modules/invoices'
import invoice from './modules/invoice'

export default createStore({
  modules: {
    namespaced: true,
    
    authentication,
    signup,
    login,
    clients,
    client,
    team,
    invoices,
    invoice
  }
})


