import Vue from "vue";
import Vuex from "vuex";
//import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    browser:''
  },
  mutations: {
    setBrowser(state,data){
		state.browser = data
	}
  }
});

export default store;
