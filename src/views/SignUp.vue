<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input
                autocomplete=""
                type="text"
                class="input"
                v-model="username"
              >
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input
                autocomplete=""
                type="password"
                class="input"
                v-model="password"
              >
            </div>
          </div>

          <div
            class="notification is-danger"
            v-if="signupErrors.length"
          >
            <p
              v-for="error in signupErrors"
              v-bind:key="error"
            >{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>

        </form>

        <hr>

        <router-link to="/login">Click here</router-link> to log in!
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions("signup", ["signup"]),
    submitForm(e) {
      const formData = {
        username: this.username,
        password: this.password
      };

      this.signup(formData);
    }
  },
  computed: {
    ...mapGetters("signup", ["signupErrors"])
  }
};
</script>