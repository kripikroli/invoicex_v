import axios from 'axios'
import { toast } from 'bulma-toast'

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
}

const mutations = {
    POPULATE_INVOICE(state, data) {
        state.invoice = {}
        if (data) {
            state.invoice = data
        }
    },
}

export default ({
    namespaced: true,

    state,
    getters,
    actions,
    mutations
})