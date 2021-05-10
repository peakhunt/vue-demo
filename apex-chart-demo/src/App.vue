<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>

      <v-btn class="mr-2" @click="$store.dispatch('start')">Start Simulation</v-btn>
      <v-btn class="mr-2" @click="$store.dispatch('stop')">Stop Simulation</v-btn>
      <v-btn class="mr-2" @click="$store.dispatch('reset')">Reset</v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
