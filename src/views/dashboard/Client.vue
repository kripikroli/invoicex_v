<template>
  <div class="page-client">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">{{ client.name }}</h1>

        <router-link :to="{ name: 'EditClient', params: { id: client.id }}" class="button is-light mt-4">Edit</router-link>
      </div>

      <div class="column is-12">
        <h2 class="subtitle">Contact details</h2>

        <p>
          <strong>{{ client.name }}</strong>
        </p>

        <p v-if="client.address_line_1">{{ client.address_line_1 }}</p>
        <p v-if="client.address_line_2">{{ client.address_line_2 }}</p>
        <p v-if="client.city_name || client.state_name">
          {{ client.city_name }} {{ client.state_name }}
        </p>
        <p v-if="client.country_name || client.zip_code">
          {{ client.country_name }} {{ client.zip_code }}
        </p>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Client",
  mounted() {
    this.getClient(this.$route.params.id);
  },
  methods: {
    ...mapActions("client", ["getClient"]),
  },
  computed: {
    ...mapGetters("client", ["client"]),
  },
};
</script>