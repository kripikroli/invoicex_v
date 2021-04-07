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

            <div class="column is-12">
                <div class="field">
                    <label>Email</label>
                    <div class="control">
                        <input type="email" class="input" v-model="team.email">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>Address line 1</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.address_line_1">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>Address line 2</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.address_line_2">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>City</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.city_name">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>State</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.state_name">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>Country</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.country_name">
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>Zipcode</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.zip_code">
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