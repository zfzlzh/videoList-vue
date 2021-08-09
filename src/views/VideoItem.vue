<template>
	<div class="video-item">
		<!-- 返回上一页 -->
		<div class="back" @click="backList">
			<i class="fas fa-reply"></i>
		</div>
		<!-- 视频信息 -->
		<div class="info">
			<div class="info-name">
				<span>名称：</span>
				<span>{{info.name}}</span>
			</div>
			<div class="info-time">
				<span>时长：</span>
				<span>{{info.time}}</span>
			</div>
			<div class="info-tag">
				<span>标签：</span>
				<div class="flexWrap">
					<div class="tags-item" v-for="item in info.tags">
						<span>{{item}}</span>
					</div>
				</div>
			</div>
			<div class="info-type">
				<span>类型：</span>
				<span>{{info.type}}</span>
			</div>
			<div class="remark">
				<span>简介：</span>
				<span>{{info.remark}}</span>
			</div>
		</div>
		<!-- 视频 -->
		<div class="video">
			<videoPlayer></videoPlayer>
		</div>
		<!-- 上传者信息 -->
		<div class="uploader">
			<div class="uploader-cover">
				<img :src="uploader.cover" alt="">
			</div>
			<div class="uploader-info">
				<div class="uploader-name">
					<span>{{uploader.name}}</span>
				</div>
				<div class="uploader-total">
					<span>该用户共</span>
					<span>{{uploader.total}}</span>
					<span>视频</span>
				</div>
				<div class="uploader-remark">
					<span>>>点击进入空间查看</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import videoPlayer from '../components/videoPlayer.vue'
	export default {
		data(){
			return {
				videoId:'',
				info:{
					name:'',
					type:'',
					tags:['aaa','bbbbb','adfsadf','asdfadsf','asdfasdf'],
					time:'',
					remark:'asdfdasfasdfasdfasdfasdfasdf'
				},
				uploader:{
					name:'adfasf',
					total:0,
					cover:''
				},
				preview:''
			}
		},
		components:{
			videoPlayer
		},
		mounted(){
			this.videoId = this.$route.query.id
			this.searchVideo()
		},
		methods:{
			searchVideo(){
				
			},
			backList(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-item{
		width:100%;
		padding: 0 2vh;
		@include borderBox
	}
	.back{
		text-align: left;
		margin-bottom:2vh
	}
	.info{
		&>div{
			text-align: left;
			min-height: 5vh;
			line-height:3vh;
			font-size: 2vh;
			&>span{
				width: 8vh;
				font-size: 2vh;
			}
		}
		.info-tag{
			@extend .flexBox;
			.tags-item{
				height: 3vh;
				padding: 0 1vh;
				background: $blue;
				border-radius: 4px;
				color: #fff;
				margin:0 1vh 1vh 0;
			}
		}
	}
	.video{
		height:25vh;
		width: 100%;
	}
	.uploader{
		height: 15vh;
		margin-top: 2vh;
		border: 1px solid #ccc;
		@include flex;
		@include borderBox;
		padding:1vh;
		.uploader-cover{
			width:40%;
			border:1px solid #ccc;
		}
		.uploader-info{
			width:60%;
			padding:0 1vh;
			&>div{
				height:33.33%;
				text-align: left;
				@extend .flexVerCenter
			}
		}
		.uploader-remark{
			font-size:1vh
		}
	}
</style>
