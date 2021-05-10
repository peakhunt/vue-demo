<script>
import { Line, mixins } from 'vue-chartjs';
import zoom from 'chartjs-plugin-zoom';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  name: 'chart',
  mixins: [reactiveProp],
  props: ['options'],
  methods: {
    update() {
      this.$data._chart.update();
    },
    reset() {
      //this.$data._chart.resetZoom();
      // this works much  better
      this.renderChart(this.chartdata, this.options)
    },
  },
  mounted() {
    this.addPlugin(zoom);
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style>
</style>
