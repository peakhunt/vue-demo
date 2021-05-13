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

      <v-col cols="4" class="d-flex justify-center">
        <renderer :size="{w : 300, h: 300}">
          <scene>
            <orbit-controls :position="camera">
              <camera></camera>
            </orbit-controls>
            <Cube v-if="true" :size="8" :texture="require('../assets/cobblestone.png')"></Cube>
            <AxesHelper v-if="false" :size="10"></AxesHelper>

            <ArrowHelper :dir="{ x: 0, y: 0, z: 1 }" :origin="{ x: 0, y: 0, z: 0 }" :length="8" :color="0x0000ff" :headScale="0.1"></ArrowHelper>
            <ArrowHelper :dir="{ x: 1, y: 0, z: 0 }" :origin="{ x: 0, y: 0, z: 0 }" :length="8" :color="0xff0000" :headScale="0.1"></ArrowHelper>
            <ArrowHelper :dir="{ x: 0, y: 1, z: 0 }" :origin="{ x: 0, y: 0, z: 0 }" :length="8" :color="0x00ff00" :headScale="0.1"></ArrowHelper>

            <light :hex="0xef0011" :intensity="2" :position="{ x: 20, y: 20, z: 20 }"></light>
            <light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"></light>
          </scene>
        </renderer>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <SphereFit :size="{ w: 300, h: 300}">
        </SphereFit>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cube from './Cube.vue';
import AxesHelper from './AxesHelper.vue';
import ArrowHelper from './ArrowHelper.vue';
import SphereFit from './SphereFit.vue';

export default {
  name: 'HelloWorld',
  components: {
    Cube,
    AxesHelper,
    ArrowHelper,
    SphereFit,
  },
  data: () => ({
    camera: {
      x: 0, y: 0, z: 15
    },
  }),
}
</script>
