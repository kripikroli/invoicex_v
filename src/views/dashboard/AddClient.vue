<template>
  <div class="page-add-client">
    <nav
      class="breadcrumb"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/dashboard/clients">Clients</router-link>
        </li>
        <li class="is-active">
          <router-link
            to="/dashboard/clients/add"
            aria-current="true"
          >Add</router-link>
        </li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Add client</h1>
      </div>

      <div class="column is-6">
        <div class="field">
          <label>Name</label>

          <div class="control">
            <input
              type="text"
              name="name"
              class="input"
              v-model="client.name"
            />
          </div>
        </div>

        <div class="field">
          <label>Email</label>

          <div class="control">
            <input
              type="email"
              name="email"
              class="input"
              v-model="client.email"
            />
          </div>
        </div>

        <div class="field">
          <label>Company number</label>

          <div class="control">
            <input
              type="text"
              name="company_number"
              class="input"
              v-model="client.company_number"
            />
          </div>
        </div>

      </div>

      <div class="column is-6">
        <div class="field">
          <label>Address 1</label>

          <div class="control">
            <input
              type="text"
              name="address1"
              class="input"
              v-model="client.address_line_1"
            />
          </div>
        </div>

        <div class="field">
          <label>Address 2</label>

          <div class="control">
            <input
              type="text"
              name="address2"
              class="input"
              v-model="client.address_line_2"
            />
          </div>
        </div>

        <div class="field">
          <label>City</label>

          <div class="control">
            <input
              type="text"
              name="city"
              class="input"
              v-model="client.city_name"
            />
          </div>
        </div>

        <div class="field">
          <label>State</label>

          <div class="control">
            <input
              type="text"
              name="state"
              class="input"
              v-model="client.state_name"
            />
          </div>
        </div>

        <div class="field">
          <label>Country</label>

          <div class="control">
            <input
              type="text"
              name="country"
              class="input"
              v-model="client.country_name"
            />
          </div>
        </div>

        <div class="field">
          <label>Zipcode</label>

          <div class="control">
            <input
              type="text"
              name="zipcode"
              class="input"
              v-model="client.zip_code"
            />
          </div>
        </div>
      </div>

      <div class="column is-12">
        <div class="field">
          <div class="control">
            <button
              class="button is-success"
              @click="submitForm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddClient",
  data() {
    return {
      client: {
        invoices: []
      }
    };
  },
  methods: {
    ...mapActions("client", ["addClient"]),
    submitForm() {
      this.addClient(this.client);
    }
  }
};
</script>