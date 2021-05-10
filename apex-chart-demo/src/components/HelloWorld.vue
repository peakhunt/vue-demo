<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div>
          <apexchart ref="chart1" height="400" type="line" :options="options" :series="series"></apexchart>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  computed: { 
    ...mapGetters([
      'chartData',
      'updateCount',
    ]),
  },
  data: () => ({
    options: {
      chart: {
        id: 'vuechart-example'
      },
      xaxis: {
        categories: [],
        tickAmount: 10,
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return val.toFixed(2);
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#ff0000'],
      },
    },
    series: [{
      name: 'series-1',
      data: []
    }]
  }),
  mounted() {
  },
  watch: {
    updateCount() {
      const nupdate = 10;
      let l = this.chartData.length;
      let c = this.updateCount;

      if (c === 0 ) {
        this.$refs.chart1.updateSeries([{
          data: [],
        }]);
        return;
      }

      if (c % nupdate != 0) {
        return;
      }

      let i = 0;

      for(i = 0; i < nupdate; i++) {
        let d = this.chartData[l -nupdate + i];

        this.options.xaxis.categories.push(c);
        this.series[0].data.push(d.v);
      }

      while(this.options.xaxis.categories.length > 128) {
        this.options.xaxis.categories.shift();
        this.series[0].data.shift();
      }

      this.$refs.chart1.updateOptions({
        xaxis: {
          categories: this.options.xaxis.categories,
          tickAmount: 10,
        }
      });

      this.$refs.chart1.updateSeries([{
        data: this.series[0].data,
      }]);
    },
  },
}
</script>
