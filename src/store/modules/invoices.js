import axios from 'axios'

const state = {
    invoices: []
}

const getters = {
    invoices: (state) => state.invoices,
}

const actions = {
    getInvoices({commit}) {
        axios
            .get('/api/v1/invoices/')
            .then(res => {
                commit('POPULATE_INVOICES', res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }
}

const mutations = {
    POPULATE_INVOICES(state, list) {
        state.invoices = []
        if (list) {
            for (let i = 0; i < list.length; i++) {
                state.invoices.push(list[i])
            }
        }
    }
}

export default ({
    namespaced: true,

    state,
    getters,
    actions,
    mutations
})