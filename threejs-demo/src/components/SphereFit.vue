<template>
  <renderer :size="size">
    <scene ref="scene">
      <orbit-controls :position="camera">
        <camera></camera>
      </orbit-controls>
      
      <ArrowHelper :dir="{ x: 0, y: 0, z: 1 }" :origin="{ x: 0, y: 0, z:-8 }" :length="16" :color="0x0000ff" :headScale="0.05"></ArrowHelper>

      <ArrowHelper :dir="{ x: 1, y: 0, z: 0 }" :origin="{ x:-8, y: 0, z: 0 }" :length="16" :color="0xff0000" :headScale="0.05"></ArrowHelper>

      <ArrowHelper :dir="{ x: 0, y: 1, z: 0 }" :origin="{ x: 0, y:-8, z: 0 }" :length="16" :color="0x00ff00" :headScale="0.05"></ArrowHelper>

      <ThreePoints ref="pt" :maxPoints="4096" :points="points" :color="0xffffff">
      </ThreePoints>
    </scene>
  </renderer>
</template>

<script>
import ArrowHelper from './ArrowHelper.vue';
import ThreePoints from './ThreePoints.vue';

export default {
  name: 'SphereFit',
  props: [ 'size' ],
  components: {
    ArrowHelper,
    ThreePoints,
  },
  data: () => ({
    camera: {
      x: 3, y: 10, z: 10
    },
    points: [
    ],
  }),
  methods: {
    rand(min, max) {
      return Math.random() * (max - min) + min;
    },
    add_point(p) {
      this.$refs.pt.add_point(p);
    },
  },
}
</script>
