<template>
    <div class="page-edit-team">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Edit team</h1>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>Name</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.name">
                    </div>
                </div>
            </div>
            <div class="column is-12">
                <div class="field">
                    <label>Company number</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.company_number">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>First invoice number</label>
                    <div class="control">
                        <input type="number" class="input" v-model="team.first_invoice_number">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>Bank account</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.bank_account">
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <button class="button is-success" @click="submitForm">Save</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: "EditTeam",
    methods: {
        ...mapActions('team', ['getOrCreateTeam', 'editTeam']),
        submitForm() {
            this.editTeam(this.team)
        }
    },
    computed: {
        ...mapGetters('team', ['team'])
    },
    async mounted() {
        await this.getOrCreateTeam()
    },
};
</script>