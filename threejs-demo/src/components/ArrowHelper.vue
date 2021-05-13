<script>
import * as THREE from 'three'
import { Object3D } from 'vue-threejs'

export default {
  name: 'ArrowHelper',
  mixins: [Object3D],
  props: [ 'dir', 'origin', 'length', 'color', 'headScale' ],
  data() {
    let curObj = this.obj;

    if(!curObj) {
      curObj = new THREE.ArrowHelper( this.dir, this.origin, this.length, this.color,
        this.headScale * this.length, this.headScale * this.length);
    }

    return { curObj };
  },
}
</script>
