<template>
    <div class="page-my-account">
        <h1 class="title">My account</h1>

        <strong>Team: </strong>{{ team.name }} <br>
        <strong>Username: </strong> {{ user.username }}

        <hr>
        <div class="buttons">
            <router-link to="/dashboard/my-account/edit-team" class="button is-light">Edit Team</router-link>
            <button @click="logout()" class="button is-danger">Logout</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "MyAccount",
    methods: {
        ...mapActions('login', ['logout']),
        ...mapActions('team', ['getOrCreateTeam'])
    },
    computed: {
        ...mapGetters('authentication', ['user']),
        ...mapGetters('team', ['team'])
    },
    async mounted() {
        await this.getOrCreateTeam()
    },
};
</script>