<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="12" class="mb-4 text-center">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        <renderer :size="{w : 600, h: 400}">
          <scene>
            <orbit-controls :position="camera">
              <camera></camera>
            </orbit-controls>
            <Cube :size="8" :texture="require('../assets/cobblestone.png')"></Cube>
            <light :hex="0xef0011" :intensity="2" :position="{ x: 20, y: 20, z: 20 }"></light>
            <light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"></light>
          </scene>
        </renderer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cube from './Cube.vue';

export default {
  name: 'HelloWorld',
  components: {
    Cube,
  },
  data: () => ({
    camera: {
      x: 0, y: 0, z: 15
    },
  }),
}
</script>
