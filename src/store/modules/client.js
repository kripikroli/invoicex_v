import axios from 'axios'
import { toast } from 'bulma-toast'
import router from '@/router'

const state = {
    client: {
        invoices: []
    }
}


const getters = {
    client: (state) => state.client
}


const actions = {
    async getClient({commit}, id) {
        await axios
            .get(`/api/v1/clients/${id}`)
            .then(res => {
                commit('SET_CLIENT_DETAIL', res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
   },
   addClient({commit}, data) {
        axios
            .post('/api/v1/clients/', data)
            .then(res => {
                commit('REDIRECT_TO_CLIENTS')

                toast({
                    message: 'Added client successfully!',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                })

            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
   },
   editClient({commit}, data) {
        axios
            .put(`/api/v1/clients/${data.id}/`, data)
            .then(res => {
                commit('REDIRECT_TO_CLIENTS')

                toast({
                    message: 'Updated client successfully!',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                })
                
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    },

}

const mutations = {
    SET_CLIENT_DETAIL(state, list) {
        state.client = []
        if (list) {
            state.client = list
        }
    },
    REDIRECT_TO_CLIENTS(state) {
        router.push('/dashboard/clients')
    }
   
}

export default({
    namespaced: true,
    state,
    getters,
    actions,
    mutations
})