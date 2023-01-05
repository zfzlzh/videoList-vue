/*
 * @Author: zfz
 * @Date: 2021-07-30 16:09:25
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-19 14:30:57
 * @Description: update
 */
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import '@fortawesome/fontawesome-free/css/all.min.css'
import store from "@/store";
import commonUtils from './untils/commonUtils.js'
import axios from 'axios'
// import "../static/css/global.scss";
Vue.config.productionTip = false
 Vue.use(store);
 Vue.prototype.$commonUtils = commonUtils
 Vue.prototype.$axios = axios
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
