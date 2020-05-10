<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/troll.png"
            transition="scale-transition"
            width="60"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <router-link to="/submit-yours" v-if="$route.name == 'Jokes'">
        <v-btn text>
          <span class="mr-2">Submit Joke</span>
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/" v-else>
        <v-btn text>
          <span class="mr-2">Read Jokes</span>
          <v-icon>mdi-book</v-icon>
        </v-btn>
      </router-link>
      <v-btn href="https://github.com/thapaPrabhat/daily-meme" target="_blank" text>
        <span class="mr-2">Source</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <div class="ma-8"></div>
    <v-spacer></v-spacer>
    <v-footer dark class="font-weight-medium">
      <v-col>Api version : {{ apiInfo.version }}</v-col>
      <v-col class="text-centered">Total Jokes : {{ count }}</v-col>
      <v-col class="text-right">Updated : {{ apiInfo.timestamp | formatedDate }}</v-col>
    </v-footer>
  </v-app>
</template>
  
<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({}),
  mounted() {
    this.$store.dispatch("initialApiFetch");
  },
  computed: {
    ...mapGetters(["apiInfo", "count"])
  }
};
</script>
