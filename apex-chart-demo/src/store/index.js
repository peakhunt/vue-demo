import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const max_data_num = 5096;
var timer = null;

export default new Vuex.Store({
  state: {
    chartData: [],
    updateCount: 0,
  },
  getters: {
    chartData(state) {
      return state.chartData;
    },
    updateCount(state) {
      return state.updateCount;
    },
  },
  mutations: {
    ADD_TO_CHART(state, { ndx, v1 }) {
      if(state.chartData.length >= max_data_num) {
        state.chartData.shift();
      }
      state.chartData.push({
        ndx: ndx,
        v: v1
      });
      state.updateCount += 1;
    },
    RESET_CHART(state) {
      state.chartData = [];
      state.updateCount = 0;
    },
  },
  actions: {
    start({ commit, getters }) {
      timer = setInterval(() => {
        // 50 * sin(2 * pi * F * i + phase)
        let ndx = (getters.updateCount % 1024) / 1024;
        let v1 = 50 * Math.sin(2 * Math.PI * 32 * ndx );

        commit('ADD_TO_CHART', { ndx, v1 });
      }, 10);
    },
    stop() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    },
    reset({commit}) {
      commit('RESET_CHART');
    }
  },
  modules: {
  }
})
