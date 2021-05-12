<script>
import * as THREE from 'three'
import { Object3D } from 'vue-threejs'

export default {
  name: 'AxesHelper',
  mixins: [Object3D],
  props: { size: Number },
  data() {
    let curObj = this.obj;

    if(!curObj) {
      curObj = new THREE.AxesHelper( this.size);
    }

    return { curObj };
  },
}
</script>
