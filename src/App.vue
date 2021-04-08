<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand ml-5">
        <router-link
          to="/"
          class="navbar-item"
        >
          <strong>InvoiceX</strong>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="authenticated">
            <router-link
              to="/dashboard"
              class="navbar-item"
            >Dashboard</router-link>
            <router-link
              to="/dashboard/clients"
              class="navbar-item"
            >Clients</router-link>
            <router-link
              to="/dashboard/invoices"
              class="navbar-item"
            >Invoices</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link
                  to="/dashboard/invoices/add"
                  class="button is-success"
                >Add invoice</router-link>
                <router-link
                  to="/dashboard/my-account"
                  class="button is-light"
                >My account</router-link>
              </div>
            </div>

          </template>

          <template v-else>
            <router-link
              to="/"
              class="navbar-item"
            >Home</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link
                  to="/signup"
                  class="button is-success"
                ><strong>Sign up</strong></router-link>
                <router-link
                  to="/login"
                  class="button is-light"
                >Log in</router-link>

              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view></router-view>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  beforeCreate() {
    this.$store.dispatch("authentication/initialize");
  },
  computed: {
    ...mapGetters("authentication", ["authenticated"])
  },
  methods: {
    ...mapActions("authentication", ["initialize", "removeToken"]),
    ...mapActions("login", ["logout"])
  }
};
</script>

<style lang="scss">
@import "../node_modules/bulma";
</style>
