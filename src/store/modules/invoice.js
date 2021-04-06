import axios from 'axios'
import { toast } from 'bulma-toast'
import router from '../../router'

const state = {
    invoice: {},
}

const getters = {
    invoice: (state) => state.invoice,
}

const actions = {
    getInvoice({commit}, id) {
        axios
            .get(`/api/v1/invoices/${id}`)
            .then(res => {
                commit('POPULATE_INVOICE', res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    },
    addInvoice({commit}, data) {
        axios
            .post('/api/v1/invoices/', data)
            .then(res => {

                commit('REDIRECT_TO_INVOICES')

                toast({
                    message: 'Added invoice successfully!',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                })
                
            })
            .catch(error => {
                console.log(JSON.stringify(error))
            })
    }
}

const mutations = {
    POPULATE_INVOICE(state, data) {
        state.invoice = {}
        if (data) {
            state.invoice = data
        }
    },
    REDIRECT_TO_INVOICES(state) {
        router.push('/dashboard/invoices')
    }
}

export default ({
    namespaced: true,

    state,
    getters,
    actions,
    mutations
})