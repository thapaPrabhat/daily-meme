<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-row class="text-center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="filter.category"
              :items="categories"
              label="Category"
              outlined
              hint="Choose category/s."
              persistent-hint
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              class="text-capitalize"
              v-model="filter.type"
              :items="types"
              item-text="title"
              item-value="value"
              label="Type"
              outlined
              hint="Type"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12" v-if="filter.type == 'single'">
            <v-textarea label="Joke" auto-grow v-model="joke"></v-textarea>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12" v-else>
            <v-row>
              <v-col class="d-flex" cols="12" sm="12">
                <v-text-field v-model="setUp" label="Set up"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="12">
                <v-text-field v-model="delivery" label="Delivey"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-checkbox
            v-model="filter.flag"
            class="mx-2"
            :label="flag"
            v-for="(flag, i) in flags"
            :key="i"
            :value="flag"
          ></v-checkbox>
          <v-col class="d-flex" cols="12" sm="12">
            <div class="text-center">
              <v-btn x-large color="success" @click="submitJoke">Submit Joke</v-btn>
            </div>
          </v-col>
          <v-col>
            <v-alert :type="submission.status" v-if="submission.status">{{ submission.message }}</v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SubmitJoke",

  data: () => ({
    types: [
      { title: "Single", value: "single" },
      { title: "Two Part", value: "twopart" }
    ],
    setUp: "",
    delivery: "",
    filter: {
      category: "",
      type: "single",
      flag: []
    },
    submission: {
      status: null,
      message: ""
    }
  }),
  methods: {
    submitJoke() {
      var joke = {
        joke: this.joke
      };
      if (this.filter.type != "single") {
        joke = {
          setup: this.setUp,
          delivery: this.delivery
        };
      }
      var data = {
        formatVersion: 2,
        category: this.filter.category,
        flags: this.filterFlags,
        type: this.filter.type
      };
      this.$http
        .put("https://sv443.net/jokeapi/v2/submit", { ...data, ...joke })
        .then(res => {
          this.submission.status = "success";
          this.submission.message = res.data.message;
          this.filter = {
            category: "",
            type: "single",
            flag: []
          };
          this.joke = "";
        })
        .catch(() => {
          this.submission.status = "error";
          this.submission.message = "This joke was formatted incorrectly";
        });
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(["categories", "flags", "joke", "errors"]),
    filterFlags() {
      var self = this;
      var flags = {};
      this.flags.map(flag => {
        flags[flag] = self.filter.flag.includes(flag);
      });
      return flags;
    }
  }
};
</script>
