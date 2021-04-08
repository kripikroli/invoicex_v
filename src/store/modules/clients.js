import axios from 'axios'

const state = {
    clients: []
}


const getters = {
    clients: (state) => state.clients,
    limitedClients: (state) => state.clients.slice(0, 5)
}


const actions = {
    getClients({commit}) {
        axios
            .get('/api/v1/clients/')
            .then(res => {
                commit('SET_CLIENTS', res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
   }
}

const mutations = {
    SET_CLIENTS(state, list) {
        state.clients = []
        if (list) {
            for (let i = 0; i < list.length; i++) {
                state.clients.push(list[i])
            }
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