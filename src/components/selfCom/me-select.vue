<template>
	<div class="me-select"  v-clickOutside="closeOption">
		<div class="mulite-div form-input-item" v-if="mulite" @click="showOption">
			<div class="flexVerCenter">
				<div 
					class="mulite-item flexVerCenter"
					v-if="selectedLabelList[0]"
				>
					<span>{{selectedLabelList[0]}}</span>
					<i class="close" @click="removeSelected">×</i>
				</div>
				<div class="mulite-item" v-if="selectedLabelList.length > 1">
					+{{selectedLabelList.length - 1}}
				</div>
			</div>
			<input
				type="text" 
				:value="selectedValue.label" 
				class="form-input-item" 
				v-if="filterable"
				@click="showOption"
			/>
		</div>
		<div class="form-input-item" v-else-if="!filterable" @click="showOption">
			{{selectedValue.label}}
		</div>
		<input 
			type="text" 
			:value="selectedValue.label" 
			class="form-input-item" 
			v-else 
			@click="showOption"
		/>
		<!-- 下拉框 -->
		<div 
			class="option-list" 
			:class="showOptionList ? 'show' : 'hide'"
			:style="showOptionList ? 'height:' + calcOptionHeight : 'height:0;border-color:transparent'"
		>
			<meScrollbar>
				<div 
					class="option-list-item" 
					v-for="item in optionList" 
					:key="item.value" 
					@click="selectValue(item)"
				>
					{{item.label}}
				</div>
			</meScrollbar>
		</div>
	</div>
</template>

<script>
	import meScrollbar from './me-scrollbar.vue'
	import clickOutside from "../../untils/clickOutside.js";
	export default {
		props:{
			mulite:{
				type:Boolean,
				default:false
			},
			optionList:{
				type:Array,
				default:()=>[]
			},
			filterable:{
				type:Boolean,
				default:false
			}
		},
		directives: {
		    clickOutside
		},
		data(){
			return {
				selectedList:[],
				selectedValue:'',
				selectedValueList:[],
				selectedLabelList:[],
				showOptionList:false
			}
		},
		computed:{
			selectInput(){
				return 'selectInput' + Math.random() * 10000
			},
			calcOptionHeight(){
				let single = document.getElementsByClassName('option-list-item')[0]
				let hei = single.clientHeight
				return hei * this.optionList.length + 'px'
			}
		},
		components:{
			meScrollbar
		},
		methods:{
			//显示下拉数据
			showOption(){
				this.showOptionList = true
			},
			//选择下拉数据
			selectValue(item){
				if(this.mulite){
					let index = this.selectedValueList.indexOf(item.value)
					if(index < 0){
						this.selectedValueList.push(item.value)
						this.selectedLabelList.push(item.label)
					}else{
						this.selectedValueList.splice(index)
						this.selectedLabelList.splice(index)
					}
					
				}else{
					this.selectedValue = item
					this.closeOption()
				}
				
			},
			//关闭下拉列表
			closeOption(){
				if(this.showOptionList){
					this.showOptionList = false
				}
				let value = this.mulite ? this.selectedList : this.selectValue
				this.$emit('change',value)
			},
			//多选移除首个
			removeSelected(){
				this.selectedValueList.splice(0,1)
				this.selectedLabelList.splice(0,1)
			}
		}
	}
</script>

<style lang="scss">
	.option-list{
		// min-height:50px;
		background:#fff;
		width: 100%;
		padding: 0 10px;
		border:1px solid #ccc;
		transition:height .1s linear;
		position: relative;
		top: 1.5vh;
		&::before{
			content:'';
			border-bottom:8px solid #ccc;
			border-left:5px solid transparent;
			border-right:5px solid transparent;
			width:1px;
			height:1px;
			position: absolute;
			top: -9px;
			left: 18px;
		}
		&.show{
			&::before{
				display: block;
			}
		}
		&.hide{
			&::before{
				display: none;
			}
		}
	}
	.me-scrollbar-view{
		
	}
	.option-list-item{
		height: 4vh;
		@extend .flexCenter;
		@extend .cursorP;
		&:hover{
			background:rgba(12,154,154,.2);
		}
	}
	.me-select{
		@include overSpread
	}
	.mulite-div{
		@include overSpread
	}
	.mulite-item{
		padding: 5px 10px;
		background: rgba(200,200,200,.4);
		margin-right: 10px;
		border-radius:4px
	}
	.close{
		border-radius: 50%;
		width:1.5vh;
		height:1.5vh;
		background:rgba(100,100,100,.4);
		display:inline-flex;
		@include ai-center;
		@include jc-center;
		font-size:1.5vh;
		margin-left: 7px;
		@extend .cursorP
	}
</style>
