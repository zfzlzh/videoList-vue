import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import '@fortawesome/fontawesome-free/css/all.min.css'
import store from "@/store";
// import "../static/css/global.scss";
Vue.config.productionTip = false
 Vue.use(store);
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
