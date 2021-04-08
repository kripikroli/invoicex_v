import axios from 'axios'
import { toast } from 'bulma-toast'
import router from '@/router'

const fileDownload = require('js-file-download')

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
    },
    generatePdf({commit}, id) {
        axios
            .get(`/api/v1/invoices/${id}/generate_pdf/`, {
                responseType: 'blob',
            }).then(res => {
                fileDownload(res.data, `invoice_${id}.pdf`)
            }).catch(err => {
                console.log(err);
            })
    },
    setAsPaid({commit}, data) {
        
        axios
            .patch(`/api/v1/invoices/${data.id}/`, data)
            .then(res => {

                toast({
                    message: 'The changes was saved!',
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
    makeCredited({commit}, data) {
        axios
            .patch(`/api/v1/invoices/${data.id}/`, data)
            .then(res => {
                
                toast({
                    message: 'The changes was saved!',
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
    makeCreditNote({commit}, data) {
        axios
            .post('api/v1/invoices/', data)
            .then(res => {

                toast({
                    message: 'Credit note was created!',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                })

                commit('REDIRECT_TO_INVOICES')
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    },
    sendReminder({commit}, id) {
        axios
            .get(`/api/v1/invoices/${id}/send_reminder/`)
            .then(response => {
                
                toast({
                    message: 'Reminder was sent!',
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
    POPULATE_INVOICE(state, data) {
        state.invoice = {}
        if (data) {
            state.invoice = data
        }
    },
    REDIRECT_TO_INVOICES(state) {
        router.push('/dashboard/invoices')
    },
}

export default ({
    namespaced: true,

    state,
    getters,
    actions,
    mutations
})