<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <LineChart :height="chartHeight" ref="demo0" :chartData="demo0Collection" :options="demo0Options"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from './LineChart';
import { mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters([
      'chartData',
      'updateCount',
    ]),
  },
  data: () => ({
    chartHeight: 300,
    demo0Collection: {
      labels: [],
      datasets: [
        {
          label: 'Ultra Sonic',
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
        text: 'Demo Data'
      },
      onClick: null,
    },
  }),
  watch: {
    updateCount() {
      const nupdate = 1;
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
      /*
      let collection = {
        ...this.demo0Collection,
      };
      const nupdate = 1;
      const maxData = 256;

      let l = this.chartData.length;
      let c = this.updateCount;

      if (c === 0 ) {
        // reset
        collection.labels = [];
        collection.datasets[0].data = [];
        this.demo0Collection = collection;
        return;
      }

      if (nupdate !== 1 && c % nupdate != 0) {
        return;
      }

      let i = 0;

      for(i = 0; i < nupdate; i++) {
        let d = this.chartData[l -nupdate + i];

        collection.datasets[0].data.push(d.v);
        collection.labels.push(d.ndx);
      }

      while(this.demo0Collection.labels.length > maxData) {
        collection.datasets[0].data.shift();
        collection.labels.shift();
      }
      this.demo0Collection = collection;
      */
    },
  },
}
</script>
