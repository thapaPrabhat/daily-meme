<template>
  <v-container>
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
              hint="Blacklist Flags."
              persistent-hint
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <div class="text-center">
              <v-btn x-large color="success" @click="getJoke">Get Joke</v-btn>&nbsp;
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
    contains: ""
  }),
  methods: {
    getJoke() {
      var filterData = {
        path: this.filterCategories,
        query:
          "?blacklistFlags=" + this.filter.flag + "&contains=" + this.contains
      };
      this.$store.dispatch("getJoke", filterData);
    },

    resetFilter() {
      this.filter = {
        category: ["Any"],
        flag: [],
        contains: ""
      };
    },
    removeAny() {
      this.filter.category = this.filterCategories;
    }
  },
  computed: {
    joke() {
      return this.$store.state.joke;
    },
    errors() {
      return this.$store.state.error;
    },
    categories() {
      return this.$store.state.apiInfo.jokes.categories;
    },
    flags() {
      return this.$store.state.apiInfo.jokes.flags;
    },
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
