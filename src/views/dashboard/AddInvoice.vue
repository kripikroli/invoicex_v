<template>
  <div class="page-add-invoice">
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
            to="/dashboard/invoices/add"
            aria-current="true"
          >Add</router-link>
        </li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Add invoice</h1>
      </div>

      <div class="column is-12">
        <h2 class="is-size-5 mb-4">Client</h2>

        <div class="select is-fullwidth">
          <select
            name="client"
            v-model="invoice.client"
          >
            <option
              value=""
              selected
            >- Select client -</option>
            <option
              v-for="client in clients"
              v-bind:key="client.id"
              v-bind:value="client"
            >
              {{ client.name }}
            </option>
          </select>
        </div>

        <div
          class="box mt-4"
          v-if="invoice.client"
        >
          <p>
            <strong>{{ invoice.client.name }}</strong>
          </p>
          <p>
            <strong>Email: {{ invoice.client.email }}</strong>
          </p>
          <p v-if="invoice.client.address_line_1">
            {{ invoice.client.address_line_1 }}
          </p>
          <p v-if="invoice.client.address_line_2">
            {{ invoice.client.address_line_2 }}
          </p>
          <p v-if="invoice.client.city_name || invoice.client.state_name">
            {{ invoice.client.city_name }} {{ invoice.client.state_name }}
          </p>
          <p v-if="invoice.client.country_name || invoice.client.zip_code">
            {{ invoice.client.country_name }} {{ invoice.client.zip_code }}
          </p>

        </div>

        <div class="column is-12">
          <h2 class="is-size-5 mb-4">Items</h2>

          <ItemForm
            v-for="item in invoice.items"
            v-bind:key="item.item_num"
            v-bind:initItem="item"
            v-on:updateTotals="onUpdateTotals"
          >
          </ItemForm>

          <button
            class="button is-light"
            @click="addItem"
          >+</button>
        </div>

        <div class="column is-12">
          <h2 class="is-size-5 mb-4">Misc</h2>

          <div class="field">
            <label>Due days</label>

            <div class="control">
              <input
                type="number"
                class="input"
                v-model="invoice.due_days"
              />
            </div>
          </div>

          <div class="field">
            <label>Sender reference</label>

            <div class="control">
              <input
                type="text"
                class="input"
                v-model="invoice.sender_reference"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12">
        <h2 class="is-size-5 mb-4">Total</h2>

        <p><strong>Net amount</strong>: {{ invoice.net_amount }}</p>
        <p><strong>Vat amount</strong>: {{ formatFloat(invoice.vat_amount) }}</p>
        <p><strong>Gross amount</strong>: {{ invoice.gross_amount }}</p>
      </div>
    </div>

    <div class="column is-12">
      <button
        class="button is-success"
        @click="submitForm"
      >Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ItemForm from "@/components/ItemForm.vue";

export default {
  name: "AddInvoice",
  components: {
    ItemForm
  },
  methods: {
    ...mapActions("clients", ["getClients"]),
    ...mapActions("invoice", ["addInvoice"]),
    addItem() {
      this.invoice.items.push({
        item_num: this.invoice.items.length,
        title: "",
        unit_price: "",
        quantity: 1,
        vat_rate: 0,
        net_amount: 0
      });
    },
    onUpdateTotals(changedItem) {
      let net_amount = 0;
      let vat_amount = 0;

      let item = this.invoice.items.filter(
        i => i.item_num === changedItem.item_num
      );

      item = changedItem;

      for (let i = 0; i < this.invoice.items.length; i++) {
        const vat_rate = this.invoice.items[i].vat_rate;

        vat_amount += this.invoice.items[i].net_amount * (vat_rate / 100);

        net_amount += this.invoice.items[i].net_amount;
      }

      this.invoice.net_amount = net_amount;
      this.invoice.vat_amount = vat_amount;
      this.invoice.gross_amount = net_amount + vat_amount;
      this.invoice.discount_amount = 0;
    },
    submitForm() {
      this.invoice.client_name = this.invoice.client.name;
      this.invoice.client_email = this.invoice.client.email;
      this.invoice.client_company_number = this.invoice.client.company_number;
      this.invoice.client_address_line_1 = this.invoice.client.address_line_1;
      this.invoice.client_address_line_2 = this.invoice.client.address_line_2;
      this.invoice.client_city_name = this.invoice.client.city_name;
      this.invoice.client_state_name = this.invoice.client.state_name;
      this.invoice.client_zip_code = this.invoice.client.zip_code;
      this.invoice.client_country_name = this.invoice.client.country_name;
      this.invoice.client_contact_person = this.invoice.client.contact_person;
      this.invoice.client_contact_reference = this.invoice.client.contact_reference;
      this.invoice.vat_amount = this.formatFloat(this.invoice.vat_amount);
      this.invoice.client = this.invoice.client.id;

      this.addInvoice(this.invoice);
    },
    formatFloat(number) {
      return parseFloat(number).toFixed(2);
    }
  },
  computed: {
    ...mapGetters("clients", ["clients"])
  },
  mounted() {
    this.getClients();
  },
  data() {
    return {
      invoice: {
        client: "",
        items: [
          {
            item_num: 0,
            title: "",
            unit_price: "",
            quantity: 1,
            vat_rate: 0,
            net_amount: 0
          }
        ],
        due_days: 14,
        net_amount: 0,
        vat_amount: 0,
        gross_amount: 0
      }
    };
  }
};
</script>

