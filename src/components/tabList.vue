<template>
	<div class="tab-list">
		<div 
			class="tab-list-item" 
			v-for="item in list" 
			:key="item.url" 
			@click="clickTab(item)"
		>
			<i :class="item.icon"></i>
			<span class="name">{{item.name}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[]
			}
		},
		mounted(){
			this.list = [
				{url:'/videoList',name:'列表',icon:'fas fa-list'},
				{url:'/upload',name:'上传',icon:'fas fa-upload'},
				{url:'/user',name:'用户',icon:'fas fa-user'},			
			]
		},
		methods:{
			clickTab(item){
				this.$router.push({path:item.url})
			}
		}
	}
</script>

<style lang="scss">
	.tab-list{
		display:flex;
		.tab-list-item{
			border:1px solid #ccc;
			background:#ccc;
			font-size:2vh;
			font-weight: 600;
			width:33.33%;
			height:10vh;
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			cursor:pointer;
			.name{
				margin-top:1vh
			}
		}
	}
</style>
