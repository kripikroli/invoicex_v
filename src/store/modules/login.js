import axios from 'axios'
import router from '@/router'

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

                dispatch('getMe')
                
            })
            .catch(err => {
                commit('STORE_LOGIN_ERRORS', err);
            })
    },
    getMe({commit, dispatch}) {
        axios
            .get("/api/v1/users/me/")
            .then(res => {
                const me = { 'username': res.data.username, 'id': res.data.id }
                dispatch('authentication/setUser', me, { root : true })

                localStorage.setItem('username', res.data.username)
                localStorage.setItem('userid', res.data.id)

                router.push('/dashboard')
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    },
    logout({commit, dispatch}) {
        axios
            .post("/api/v1/token/logout/")
            .then((res) => {

                axios.defaults.headers.common["Authorization"] = ""

                localStorage.removeItem("token")
                localStorage.removeItem("userid")
                localStorage.removeItem("username")

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