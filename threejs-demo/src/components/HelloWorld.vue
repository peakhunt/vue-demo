<template>
  <v-container>
    <v-row>
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
        <SphereFit ref="sphere" :size="{ w: 300, h: 300}">
        </SphereFit>
      </v-col>

      <v-col cols="4" class="d-flex justify-center">
        <OrientationView :size="{ w: 300, h: 300}">
        </OrientationView>
      </v-col>

      <v-col cols="12" class="mb-4 text-center">
        <LineChart :height="chartHeight" ref="demo0" :chartData="demo0Collection" :options="demo0Options"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Cube from './Cube.vue';
import AxesHelper from './AxesHelper.vue';
import ArrowHelper from './ArrowHelper.vue';
import SphereFit from './SphereFit.vue';
import OrientationView from './OrientationView.vue';
import LineChart from './LineChart';

export default {
  name: 'HelloWorld',
  components: {
    LineChart,
    Cube,
    AxesHelper,
    ArrowHelper,
    SphereFit,
    OrientationView,
  },
  computed: {
    ...mapGetters([
      'chartData',
      'updateCount',
    ]),
  },
  data: () => ({
    camera: {
      x: 0, y: 0, z: 15
    },
    chartHeight: 300,
    demo0Collection: {
      labels: [],
      datasets: [
        {
          label: 'Gyro',
          fill: false,
          borderColor: '#8e5ea2',
          borderWidth : 1,
          pointRadius: 0,
          data: [],
        },
      ],
    },
    demo0Options: {
      animation: false,
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            enabled: true,
            mode: 'x',
          },
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true
          }
        }],
        xAxes: [ {
          gridLines: {
            display: false
          },
          ticks: {
            stepSize: 12,
            unitStepSize: 6
          },
        }]
      },
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'IMU Data'
      },
      onClick: null,
    },
  }),
  watch: {
    updateCount() {
      const nupdate = 5;
      const maxData = 256;

      let l = this.chartData.length;
      let c = this.updateCount;

      if (c === 0 ) {
        // reset
        this.demo0Collection.labels = [];
        this.demo0Collection.datasets[0].data = [];
        this.$refs.demo0.update();
        return;
      }

      if (nupdate !== 1 && c % nupdate != 0) {
        return;
      }

      let i = 0;

      for(i = 0; i < nupdate; i++) {
        let d = this.chartData[l -nupdate + i];

        this.demo0Collection.datasets[0].data.push(d.v);
        this.demo0Collection.labels.push(d.ndx);
      }

      while(this.demo0Collection.labels.length > maxData) {
        this.demo0Collection.datasets[0].data.shift();
        this.demo0Collection.labels.shift();
      }
      this.$refs.demo0.update();
    },
  },
  methods: {
    rand(min, max) {
      return Math.random() * (max - min) + min;
    },
  },
  mounted() {
    this.$store.dispatch('start');
    setInterval(() => {
      let p = {
        x: this.rand(-5, 5),
        y: this.rand(-5, 5),
        z: this.rand(-5, 5),
      };

      // normalize p
      let l = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);

      p.x /= l;
      p.y /= l;
      p.z /= l;

      p.x *= 5;
      p.y *= 5;
      p.z *= 5;

      this.$refs.sphere.add_point(p);
    }, 30);
  },
}
</script>
