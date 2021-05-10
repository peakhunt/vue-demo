import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
