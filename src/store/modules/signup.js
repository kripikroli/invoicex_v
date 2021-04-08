import axios from 'axios'
import router from '@/router'

const state = {
   errors: []
}


const getters = {
    signupErrors: (state) => state.errors
}


const actions = {

    signup({commit}, formData) {
        axios
            .post("/api/v1/users/", formData)
            .then(res => {
                router.push('/login')
            })
            .catch(err => {
                commit('STORE_SIGNUP_ERRORS', err)
            })
    }
    
}

const mutations = {
    STORE_SIGNUP_ERRORS(state, err) {
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