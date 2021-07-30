import Vue from "vue";
import Router from "vue-router";
import upload from "../views/upload.vue"
import user from "../views/user.vue"
import videoList from "../views/VideoList.vue"
Vue.use(Router);


//路由懒加载
export const router = [
	{
		path: "/",
		component: upload ,
		name: "upload",
		redirect:"/upload",
		meta: { title: "上传" },
	},
	{
		path: "/upload",
		component: upload,
		name: "上传",
		meta: { title: "上传" },
	},
	{
		path: "/user",
		component: user,
		name: "用户",
		meta: { title: "用户" },
	},
	{
		path: "/videoList",
		component: videoList,
		name: "列表",
		meta: { title: "列表" },
	},
];

export default new Router({
  // mode: 'history',
  // base: '/iot/',
  routes: router
});
