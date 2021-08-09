<template>
	<div id="app">
		<div class="mainWin">
			<router-view></router-view>
		</div>
		<tabList class="footer"></tabList>
	</div>
</template>

<script>
import tabList from './components/tabList.vue'
export default {
  name: 'app',
  components:{
	  tabList
  },
  mounted(){
		let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		let browser
		console.log(userAgent)
		if (userAgent.indexOf("Firefox") > -1) {
			browser="FF";
		} //判断是否Firefox浏览器
		if (userAgent.indexOf("Trident") > -1) {
			browser="IE";
		}; //判断是否IE浏览器
		if (userAgent.indexOf("AppleWebKit") > -1) {
			//苹果、谷歌内核
			browser = "Chrome";
		} 
		browser = userAgent.indexOf('Mobile') > -1 ? browser + 'Mobile' : browser
		this.$store.commit('setBrowser',browser)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height:100%;
  .mainWin{
	  height:87%;
	  overflow-y: scroll;
	  margin-bottom:1vh;
  }
  .footer{
	  height:12%
  }
}
</style>
