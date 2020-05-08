<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/troll.png"
          transition="scale-transition"
          width="60"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/thapaPrabhat/daily-meme"
        target="_blank"
        text
      >
        <span class="mr-2">Source</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Jokes/>
    </v-content>
  </v-app>
</template>

<script>
import Jokes from './components/Jokes';

export default {
  name: 'App',

  components: {
    Jokes,
  },

  data: () => ({
    //
  }),
};
</script>
