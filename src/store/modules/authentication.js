import axios from 'axios'
import router from '../../router'



const state = {
    user: {
        username: ''
    },
    isAuthenticated: false,
    token: ''
}


const getters = {
    authenticated: (state) => state.isAuthenticated
}


const actions = {
    initialize({commit}) {
        commit('INITIALIZE_STORE')
    },
    setToken({commit}, token) {
        commit('SET_TOKEN', token)
    },
    setHeaders({commit}) {
        commit('SET_HEADERS_AUTHORIZATION')
    },
    removeToken({commit}) {
        commit('REMOVE_TOKEN')
    }
    
}

const mutations = {
    INITIALIZE_STORE(state) {
        if (localStorage.getItem('token')) {
            state.token = localStorage.getItem('token')
            state.isAuthenticated = true
        } else {
            state.token = ''
            state.isAuthenticated = false
        }
    },
    SET_HEADERS_AUTHORIZATION(state) {
        if (state.token) {
            axios.defaults.headers.common['Authorization'] = "Token " + state.token
        } else {
            axios.defaults.headers.common['Authorization'] = ""
        }
    },
    SET_TOKEN(state, token) {
        state.token = token
        state.isAuthenticated = true
    },
    REMOVE_TOKEN(state) {
        state.token = ''
        state.isAuthenticated = false
        router.push('/login')
    }
}

export default({
    namespaced: true,
    state,
    getters,
    actions,
    mutations
})