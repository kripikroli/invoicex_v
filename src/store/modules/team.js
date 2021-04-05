import axios from 'axios'
import { toast } from 'bulma-toast'
import router from '../../router'

const state = {
    team: {}
}

const getters = {
    team: (state) => state.team
}

const actions = {
    getOrCreateTeam({commit}) {
        axios
            .get('/api/v1/teams/')
            .then(res => {
                commit('POPULATE_TEAM_INFO', res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(error))
            })
    },
    editTeam({commit, dispatch}, data) {
        if (data.id == 1) {
            dispatch('addTeam', data)
        }
        else {
            axios
                .patch(`/api/v1/teams/${data.id}/`, data)
                .then(res => {
                    commit('REDIRECT_TO_MY_ACCOUNT')

                    toast({
                        message: 'Updated team successfully!',
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
        }
    },
    addTeam({commit}, data) {
        axios
            .post(`/api/v1/teams/`, data)
            .then(res => {
                commit('REDIRECT_TO_MY_ACCOUNT')

                toast({
                    message: 'Added team successfully!',
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
    }
}

const mutations = {
    POPULATE_TEAM_INFO(state, list) {
        if (list.length > 1) {
            state.team = list[1]
        }
        else {
            state.team = list[0]
        }
    },
    REDIRECT_TO_MY_ACCOUNT(state) {
        router.push('/dashboard/my-account')
    }

}

export default ({
    namespaced: true,

    state,
    getters,
    actions,
    mutations
})