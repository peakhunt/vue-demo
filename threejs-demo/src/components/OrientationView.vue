<template>
  <renderer :size="size">
    <scene>
      <camera :position="camPos"></camera>
      <object3d ref="sf">
        <object3d :position="sfPos" :scale="1.0" base-url="sf/" :rotation="rotation">
          <mesh>
            <m-obj-mtl obj-url="SpaceFighter03.obj"
                       mtl-url="SpaceFighter03.mtl"
                       :process="getBody">
            </m-obj-mtl>
          </mesh>
        </object3d>

        <ArrowHelper :dir="{ x: 0, y: 0, z:-1 }" :origin="{ x: 0, y: 0, z: 0 }" :length="8" :color="0x0000ff" :headScale="0.05">
        </ArrowHelper>

        <ArrowHelper :dir="{ x:-1, y: 0, z: 0 }" :origin="{ x:0, y: 0, z: 0 }" :length="8" :color="0xff0000" :headScale="0.05">
        </ArrowHelper>

        <ArrowHelper :dir="{ x: 0, y: 1, z: 0 }" :origin="{ x: 0, y: 0, z: 0 }" :length="8" :color="0x00ff00" :headScale="0.05">
        </ArrowHelper>
      </object3d>

      <light :hex="0xffffff" :intensity="10" :position="{ x: 50, y: 50, z: 50 }"></light>
      <light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"></light>
    </scene>
  </renderer>
</template>

<script>
import ArrowHelper from './ArrowHelper.vue';

export default {
  name: 'OrientationView',
  props: [ 'size' ],
  components: {
    ArrowHelper,
  },
  data() {
    return {
      sfPos: {
        x: 0, y: 0, z: 0,
      },
      camPos: {
        x: 0, y: 0, z: 15,
      },
      rotation: {
        x: 0,
        y: Math.PI,
        z: 0,
      },
    };
  },
  methods: {
    getBody (group) {
      let body = group.children[0]
      body.material.color.set(0xffffff)
      return body
    },
    setOrientation(o) {
      if (o !== null) {
        //this.$refs.sf.curObj.applyQuaternion(o); what's the difference? I don't know
        this.$refs.sf.curObj.setRotationFromQuaternion(o);
      }
    },
  },
}

</script>
