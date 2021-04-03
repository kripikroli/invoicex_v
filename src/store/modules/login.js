import Vuex from 'vuex'
import axios from 'axios'
import authentication from './authentication'
import router from '../../router'

const state = {
   errors: []
}


const getters = {
    loginErrors: (state) => state.errors
}


const actions = {

    login({commit, dispatch}, formData) {
        axios
            .post("/api/v1/token/login/", formData)
            .then(res => {
                const token = res.data.auth_token

                dispatch('authentication/setToken', token, { root : true })
                dispatch('authentication/setHeaders', null, { root : true })

                localStorage.setItem("token", token)

                router.push('/dashboard')
                
            })
            .catch(err => {
                commit('STORE_LOGIN_ERRORS', err);
            })
    },
    logout({commit, dispatch}) {
        axios
            .post("/api/v1/token/logout/")
            .then((res) => {

                axios.defaults.headers.common["Authorization"] = ""

                localStorage.removeItem("token")

                dispatch('authentication/removeToken', null, { root : true })

                router.push('/login')

            })
            .catch((error) => {
                if (error) {
                  console.log(JSON.stringify(error));
                }
            });
    }
    
}

const mutations = {
    STORE_LOGIN_ERRORS(state, err) {
        state.errors = []
        if (err.response) {
            for (const property in err.response.data) {
                state.errors.push(`${property}: ${err.response.data[property]}`)
            }
        } else if (err.message) {
            console.log(JSON.stringify(err.message))
        } else {
            console.log(JSON.stringify(err))
        }
    }
}

export default({
    namespaced: true,
    state,
    getters,
    actions,
    mutations
})