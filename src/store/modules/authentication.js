import axios from 'axios'
import router from '@/router'

const state = {
    user: {
        id: '',
        username: ''
    },
    isAuthenticated: false,
    token: ''
}


const getters = {
    authenticated: (state) => state.isAuthenticated,
    user: (state) => state.user
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
    },
    setUser({commit}, user) {
        commit('SET_USER', user)
    }
    
}

const mutations = {
    INITIALIZE_STORE(state) {
        if (localStorage.getItem("token")) {
            state.token = localStorage.getItem("token")
            state.isAuthenticated = true
            state.user.id = localStorage.getItem('userid')
            state.user.username = localStorage.getItem('username')
            axios.defaults.headers.common['Authorization'] = "Token " + state.token
        } else {
            state.user.id = ''
            state.user.username = ''
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
    },
    SET_USER(state, user) {
        state.user = user
    }
}

export default({
    namespaced: true,
    state,
    getters,
    actions,
    mutations
})