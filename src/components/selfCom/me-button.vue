<template>
	<div 
		class="me-button" 
		:class="type" 
		@click="clickBtn"
	>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		prop:{
			type:{
				prop:'String',
				default:''
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			clickBtn(){
				this.$emit('click','')
			}
		}
	}
</script>

<style>
	
</style>
