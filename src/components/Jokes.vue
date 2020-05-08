<template>
  <v-container>
    <!-- <v-img :src="require('../assets/troll.png')" class="my-3" contain height="100" /> -->
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-row class="text-center">
          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              v-model="filter.category"
              :items="categories"
              label="Category"
              outlined
              multiple
              small-chips
              hint="Choose category/s."
              persistent-hint
              v-on:change="removeAny"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              class="text-capitalize"
              v-model="filter.flag"
              :items="filterFlags"
              label="Flags"
              outlined
              multiple
              small-chips
              hint="Blacklist Flag/s."
              persistent-hint
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <div class="text-center">
              <v-btn x-large color="success" @click="getJoke">{{ getJokeText }}</v-btn> &nbsp;
              <v-btn x-large color="warning" @click="resetFilter">Reset</v-btn>
            </div>
          </v-col>
          <v-col class="d-flex" cols="12" sm="8">
            <v-text-field v-model="contains" label="Contains.." outlined @keydown.enter="getJoke"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-if="joke">
      <v-card class="mx-auto" dark outlined>
        <v-card-text class="headline font-weight-bold" v-if="joke.type == 'single'">{{ joke.joke }}</v-card-text>

        <div v-else>
          <v-card-text class="display-2">{{ joke.setup }}</v-card-text>

          <v-card-text class="display-2">{{ joke.delivery }}</v-card-text>
        </div>

        <v-card-actions>
          <v-list-item class="grow">
            #{{joke.category}}
            <v-row align="center" justify="end">
              <v-chip class="ma-2" v-for="(flag, i) in jokeFlags" :key="i">{{ flag }}</v-chip>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else-if="Object.keys(errors).length">
      <v-card class="mx-auto" dark outlined color="red">
        <v-card-text class="display-2">{{ errors.message }}</v-card-text>
        <v-card-text class="display-1">{{ errors.causedBy[0] }}</v-card-text>
      </v-card>
    </div>
    
    <div class="ma-8"></div>
    <v-spacer></v-spacer>
    <v-footer absolute dark class="font-weight-medium">
      <v-col>Api version : {{ apiVersion }}</v-col>
      <v-col class="text-centered">Total Jokes : {{ count }}</v-col>
      <v-col class="text-right">Updated : {{ updatedAt }}</v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: "Jokes",

  data: () => ({
    filter: {
      category: ["Any"],
      flag: []
    },
    categories: [],
    joke: null,
    flags: [],
    getJokeText: "Get Joke",
    contains: "",
    errors: {},
    count: 0,
    apiVersion: "",
    updatedAt: ""
  }),
  methods: {
    getJoke() {
      this.$http
        .get(
          "https://sv443.net/jokeapi/v2/joke/" +
            this.filterCategories +
            "?blacklistFlags=" +
            this.filter.flag +
            "&contains=" +
            this.contains
        )
        .then(res => {
          if (res.data.error) throw res.data;
          this.joke = res.data;
          this.getJokeText = "Next Joke";
        })
        .catch(err => {
          this.joke = null;
          this.errors = err;
        });
    },
    getInitials() {
      this.$http
        .get("https://sv443.net/jokeapi/v2/info")
        .then(res => {
          if (res.errro) throw "Woops Something went wrong. Try again !";
          this.categories = res.data.jokes.categories;
          this.flags = res.data.jokes.flags;
          this.count = res.data.jokes.totalCount;
          this.apiVersion = res.data.version;
          this.updatedAt = new Date(res.data.timestamp).toGMTString();
        })
        .catch(err => {
          this.errors = {
            message: err,
            causedBy: "Unknown"
          };
        });
    },
    resetFilter() {
      this.filter = {
        category: ["Any"],
        flag: []
      };
    },
    removeAny() {
      this.filter.category = this.filterCategories
    }
  },
  mounted() {
    this.getInitials();
  },
  computed: {
    filterCategories() {
      var selectedCategoreis = this.filter.category;
      return selectedCategoreis.length > 1
        ? selectedCategoreis.filter(function(value) {
            return value != "Any";
          })
        : selectedCategoreis;
    },
    jokeFlags() {
      var jokeFlags = [];
      if (this.joke) {
        Object.entries(this.joke.flags).forEach(([key, value]) => {
          if (value === true) jokeFlags.push(key);
        });
      }
      return jokeFlags;
    },
    filterFlags() {
      return this.flags.map(function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      });
    }
  }
};
</script>
