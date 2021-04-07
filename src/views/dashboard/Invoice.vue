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
        <li>
          <router-link to="/dashboard/invoices">Invoices</router-link>
        </li>
        <li class="is-active">
          <router-link
            :to="{ name: 'Invoice', params: { id: invoice.id } }"
            aria-current="true"
          >{{ invoice.invoice_number }}</router-link>
        </li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Invoice - {{ invoice.invoice_number }}</h1>

        <button
          @click="generatePdf(this.$route.params.id)"
          class="button is-dark"
        >
          Download PDF
        </button>
      </div>

      <div class="column is-12 mb-4">
        <div class="box">
          <h3 class="is-size-4 mb-5">Client</h3>

          <p>
            <strong>{{ invoice.client_name }}</strong>
          </p>

          <p v-if="invoice.client_address_line_1">
            {{ invoice.client_address_line_1 }}
          </p>
          <p v-if="invoice.client_address_line_2">
            {{ invoice.client_address_line_2 }}
          </p>
          <p v-if="invoice.client_city_name || invoice.client_state_name">
            {{ invoice.client_city_name }} {{ invoice.client_state_name }}
          </p>
          <p v-if="invoice.client_country_name || invoice.client_zip_code">
            {{ invoice.client_country_name }} {{ invoice.client_zip_code }}
          </p>
        </div>
      </div>

      <div class="column is-12 mb-4">
        <div class="box">
          <h3 class="is-size-4">Items</h3>

          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Vat rate</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in invoice.items"
                v-bind:key="item.id"
              >
                <td>{{ item.title }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.vat_rate }}%</td>
                <td>{{ getItemTotal(item) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="column is-12">
        <div class="box">
          <h3 class="is-size-4 mb-5">Summary</h3>

          <div class="columns">
            <div class="column is-6">
              <p><strong>Net amount</strong>: {{ invoice.net_amount }}</p>
              <p><strong>Vat amount</strong>: {{ invoice.vat_amount }}</p>
              <p><strong>Gross amount</strong>: {{ invoice.gross_amount }}</p>
              <p><strong>Bank account</strong>: {{ invoice.bank_account }}</p>
            </div>

            <div class="column is-6">
              <p><strong>Our reference</strong>: {{ invoice.sender_reference }}</p>
              <p><strong>Client reference</strong>: {{ invoice.client_contact_reference }}</p>
              <p><strong>Due date</strong>: {{ invoice.get_due_date_formatted }}</p>
              <p><strong>Status</strong>: {{ getStatusLabel() }}</p>
              <p><strong>Invoice type</strong>: {{ getInvoiceType() }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Invoice",
  methods: {
    ...mapActions("invoice", ["getInvoice", "generatePdf"]),
    getItemTotal(item) {
      const unit_price = item.unit_price;
      const quantity = item.quantity;
      const total = item.net_amount + item.net_amount * (item.vat_rate / 100);
      return parseFloat(total).toFixed(2);
    },
    getStatusLabel() {
      if (this.invoice.is_paid) {
        return "Is paid";
      } else {
        return "Is not paid";
      }
    },
    getInvoiceType() {
      if (this.invoice.invoice_type === "credit_note") {
        return "Credit note";
      } else {
        return "Invoice";
      }
    },
    getItemTotal(item) {
      const unit_price = item.unit_price;
      const quantity = item.quantity;
      const total = item.net_amount + item.net_amount * (item.vat_rate / 100);
      return parseFloat(total).toFixed(2);
    }
  },
  computed: {
    ...mapGetters("invoice", ["invoice"])
  },
  async mounted() {
    await this.getInvoice(this.$route.params.id);
  }
};
</script>