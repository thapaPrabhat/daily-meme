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
              <v-btn x-large color="success ma-2" @click="getJoke">{{ getJokeText }}</v-btn>
              <v-btn x-large color="warning ma-2" @click="resetFilter">Reset</v-btn>
            </div>
          </v-col>
          <v-col class="d-flex" cols="12" sm="8">
            <v-text-field v-model="contains" label="Contains.." outlined></v-text-field>
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
    errors: {}
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
          this.errors = err;
        });
    },
    getInitials() {
      this.$http.get("https://sv443.net/jokeapi/v2/info").then(res => {
        this.categories = res.data.jokes.categories;
        this.flags = res.data.jokes.flags;
      });
    },
    resetFilter() {
      this.filter = {
        category: ["Any"],
        flag: []
      };
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
