<template>
	<div class="video-list">
		<!-- 查询 -->
		<div class="title flexBox">
			<div class="navbar-btn" @click="showNavbar = !showNavbar">
				<i class="fas fa-bars"></i>
			</div>
			<div class="title-content">
				<span>{{title}}</span>
			</div>
		</div>
		<div class="header flexCenter">
			<div class="search-bar">
				<div class="search-form">
					<input type="text" class="form-input-item" :value="searchData" :placeholder="placeholder" />
				</div>
				<div class="search-form-select">
					<meSelect :optionList="typeList" v-model="searchType"></meSelect>
				</div>
				<div class="search-btn" @click="searchVideo({type:'input'})">
					<div class="search">
						<i class="fas fa-search"></i>
					</div>
				</div>
			</div>
		</div>
		<!-- 菜单栏 -->
		<div class="navbar" :class="showNavbar ? 'show' : 'hide'">
			<meScrollbar>
				<div 
					class="navbar-item" 
					v-for="item in navbarList" 
					:key="item.value" 
					@click="searchVideo({type:'navbar',fileType:item.value})"
				>
					<span>{{item.label}}</span>
				</div>
			</meScrollbar>
		</div>
		<!-- 列表 -->
		<div class="list flexWrap">
			<div 
				class="video-item flexBox" 
				v-for="item in videoList" 
				:key="item.sequence"
				@click="entryVideo(item)"
			>
				<div class="cover">
					<img :src="item.cover" alt="">
				</div>
				<div class="info">
					<div class="info-name">
						<span>{{item.fileName}}</span>
					</div>
					<div class="info-time">
						<span>{{item.time}}</span>
					</div>
					<div class="info-uploader">
						<span>{{item.uploader}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let placeholderObj = {
		'name':'请输入名称'
	}
	import meScrollbar from '../components/selfCom/me-scrollbar.vue'
	import meSelect from '../components/selfCom/me-select.vue'
	export default {
		data(){
			return{
				searchType:'',
				searchData:'',
				typeList:[
					{label:'名称',value:'name'},
					{label:'标签',value:'tag'},
				],
				videoList:[],
				title:'',
				navbarList:[],
				showNavbar:false
			}
		},
		components:{
			meSelect,
			meScrollbar
		},
		computed:{
			placeholder(){
				return placeholderObj[this.searchType]
			}
		},
		mounted(){
			this.searchType = 'name'
			this.videoList = [
				{
					fileName:'asdfasdfdafasdfafsdfadsfadsfasdfdasfadfs',
					cover:'',
					uploader:'adfasdf',
					time:'1:10:12'
				},
				{
					fileName:'',
					cover:'',
					uploader:'',
					time:''
				}
			]
			this.navbarList = [
				{
					label:'xxxx',
					value:'sss'
				}
			]
		},
		methods:{
			//查询列表
			searchVideo(obj){
				let {type,fileType} = obj
				let file = type == 'navbar' ? fileType : this.searchData
				let params = {
					file:type == 'navbar' ? fileType : this.searchData,
					type:type == 'navbar' ? 'type' : this.searchType
				}
				
			},
			//进入视频
			entryVideo(item){
				this.$router.push({
					path:'/videoItem',
					query:{id:item.id}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar{
		position:absolute;
		width: 20vh;
		height: 70vh;
		background:$blue;
		top: 10vh;
		transition:left .3s linear;
		&.show{
			left:0;
		}
		&.hide{
			left:-20vh
		}
		.navbar-item{
			text-align: left;
			padding: 0 2vh;
		}
	}
	.title{
		
	}
	.navbar-btn{
		width:7vh;
		height:4vh
	}
	.header{
		width:100%;
		height:3.5vh;
	}
	.search-bar{
		@extend .flexBox;
		width:90%;
		height:100%
	}
	.search-form{
		width:68%;
		height:100%;
		.form-input-item{
			border-top-right-radius:0;
			border-bottom-right-radius:0;
		}
	}
	:deep(.search-form-select){
		width:25%;
		height:100%;
		.form-input-item{
			border-radius:0
		}
	}
	.search-btn{
		width:7%;
		height:100%;
		
		.search{
			@include overSpread;
			@extend .flexCenter ;
			border-top-right-radius:4px;
			border-bottom-right-radius:4px;
			border:1px solid #ccc;
			@include borderBox;
			color:#ccc
		}
	}
	.list{
		// height: 76vh;
		padding:1vh;
		@include jc-center;
	}
	.video-item{
		width:90%;
		height:17vh;
		border:1px solid #ccc;
		margin-bottom: 1vh;
		padding: 1vh;
		.cover{
			width: 40%;
			border: 1px solid #ccc;
		}
		.info{
			width:60%;
			&>div{
				width:100%;
				font-size:2vh;
				text-align: left;
				padding:0 1vh;
				height:33.33%;
				@extend .flexVerCenter;
				@include borderBox;
				&>span{
					@include textEllipsis;
				}
			}
		}
	}
</style>
