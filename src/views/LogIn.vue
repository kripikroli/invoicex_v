<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Log in</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Username</label>
                        <div class="control">
                            <input autocomplete="" type="text" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input autocomplete="" type="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="loginErrors.length">
                        <p v-for="error in loginErrors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Log in</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'LogIn',
    data () {
        return {
            username: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters('login', ['loginErrors'])
    },
    methods: {
        ...mapActions('login', ['login']),
        submitForm(e) {
            const formData = {
                username: this.username,
                password: this.password
            }

            this.login(formData)
        }
    },
}
</script>