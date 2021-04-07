<template>
  <div class="page-invoice">
    <nav
      class="breadcrumb"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="is-active">
          <router-link
            to="/dashboard/invoices"
            aria-current="true"
          >Invoices</router-link>
        </li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Invoices</h1>
      </div>

      <div
        class="column is-12"
        v-if="invoices"
      >
        <table class="table is-fullwidth">
          <thead>
            <th>#</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Is Paid</th>
            <th></th>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices"
              v-bind:key="invoice.id"
            >
              <td>{{ invoice.invoice_number }}</td>
              <td>{{ invoice.client_name }}</td>
              <td>{{ invoice.gross_amount }}</td>
              <td>{{ invoice.is_paid }}</td>
              <td>
                <router-link :to="{ name: 'Invoice', params: { id: invoice.id } }">Details</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Invoices",
  methods: {
    ...mapActions("invoices", ["getInvoices"])
  },
  computed: {
    ...mapGetters("invoices", ["invoices"])
  },
  mounted() {
    this.getInvoices();
  }
};
</script>