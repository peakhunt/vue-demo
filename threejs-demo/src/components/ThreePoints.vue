<script>
import * as THREE from 'three'
import { Object3D } from 'vue-threejs'

export default {
  name: 'ThreePoints',
  mixins: [Object3D],
  props: ['maxPoints', 'points', 'color'],
  data() {
    let curObj = this.obj;

    if(!curObj) {
      let dotGeometry = new THREE.BufferGeometry();
      let positions = new Float32Array(this.maxPoints * 3);

      dotGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
      dotGeometry.setDrawRange(0, 0);

      let dotMaterial = new THREE.PointsMaterial({ color: this.color, size: 0.1, sizeAttenuation: true })

      curObj = new THREE.Points(dotGeometry, dotMaterial);
    }

    return { curObj, currentNdx: 0, numPoints: 0 };
  },
  methods: {
    add_point(p) {
      let positions = this.curObj.geometry.attributes.position.array;

      positions[this.currentNdx * 3 + 0] = p.x;
      positions[this.currentNdx * 3 + 1] = p.y;
      positions[this.currentNdx * 3 + 2] = p.z;

      this.currentNdx++;
      this.numPoints++;

      if (this.currentNdx >= this.maxPoints) {
        this.currentNdx = 0;
      }

      if (this.numPoints >= this.maxPoints) {
        this.numPoints = this.maxPoints;
      }

      this.curObj.geometry.setDrawRange(0, this.numPoints);
      this.curObj.geometry.attributes.position.needsUpdate = true;
    },
  },
}

</script>
