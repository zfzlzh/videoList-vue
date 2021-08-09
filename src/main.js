import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import '@fortawesome/fontawesome-free/css/all.min.css'
import store from "@/store";
import commonUtils from './untils/commonUtils.js'
// import "../static/css/global.scss";
Vue.config.productionTip = false
 Vue.use(store);
 Vue.prototype.$commonUtils = commonUtils
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
