<template>
	<div class="video-player" ref="videoPlayer" :style="isMobileFullScreen">
		<!-- 视频 -->
		<video :src="preview" class="form-input-item" :id="videoId">
			
		</video>
		<!-- 操作栏 -->
		<div class="player-controls">
			<!-- 暂停播放 -->
			<div class="pauseOrPlay" @click="togglePlay">
				<i class="fas" :class="isPaused ? 'fa-play' : 'fa-pause'"></i>
			</div>
			<!-- 时间 -->
			<div class="time">
				{{currentTime}}
				<span class="bold">/</span>
				{{duration}}
			</div>
			<!-- 进度条 -->
			<div class="progress" @click="clickProgress" id="progress">
				<div class="progress-in" :style="'width:' + progressIn"></div>
				<div 
					class="progress-icon" 
					id="progressIcon"
					:style="'left:' + progressIn" 
					draggable
				>
				</div>
			</div>
			<!-- 全屏 -->
			<div class="fullScreen" @click="screenFull">
				<i class="fas fa-expand"></i>
			</div>
		</div>
		<!-- 加载时的遮罩层 -->
		<div class="mask" v-if="inLoading">
			<i class="fas fa-circle-notch"></i>
		</div>
	</div>
</template>

<script>
	import screenFull from "../untils/screenFull.js"
	export default {
		mixins:[ screenFull ],
		data(){
			return{
				//视频当前时间,转化
				currentTime:'00:00:00',
				//视频总时间,转化
				duration:'00:00:00',
				//加载视频中
				inLoading:false,
				//是否暂停
				isPaused:true,
				//视频地址
				preview:'',
				//视频示例
				video:'',
				//进度条总长
				progressOffsetW:1,
				//进度条拖拽按钮
				progressIcon:'',
				//是否是移动设备
				isMobile:false,
				//拖拽进度条时的开始位置
				startDrag:0,
				//视频总长,毫秒
				oriDuration:0,
				//视频当前时间,毫秒
				oriCurrentTime:0,
				//是否在拖拽中
				inDrag:false,
				//是否全屏
				isFull:false,
				//移动端全屏用
				screenWidth:'',
				screenHeight:'',
			}
		},
		computed:{
			videoId(){
				return 'video' + Math.random() * 100000
			},
			//进度条进度
			progressIn(){
				let pre = this.oriCurrentTime / this.oriDuration * 100
				console.log('pre',pre)
				return pre + "%"
			},
			//移动端全屏
			isMobileFullScreen(){
				let style = '';
				console.log(this.isMobile)
				console.log(this.isFull)
				if(this.isMobile && this.isFull){
					style = `width:${this.screenWidth}px;height:${this.screenHeight}px;transform:rotate(90deg)`
				}
				return style
			}
		},
		mounted(){
			this.isMobile = this.$store.state.browser.indexOf('Mobile') > -1 ? true : false
			this.video = document.getElementById(this.videoId)
			this.video.addEventListener('canplay',this.videoCanPlay)
			this.progressOffsetW = document.getElementById('progress').clientWidth
			this.progressIcon = document.getElementById('progressIcon')
			this.screenDom = this.$refs['videoPlayer']
			let eventStart = this.isMobile ? 'touchstart' : 'dragstart'
			this.progressIcon.addEventListener(eventStart,this.dragProgressStart)
		},
		methods:{
			//视频可以播放
			videoCanPlay(){
				this.inLoading = false
				this.oriCurrentTime = this.video.duration
				this.duration = this.$commonUtils.videoTimeTransfer(this.video.duration)
				this.video.addEventListener('timeupdate',this.getCurrentTime)
				
			},
			//暂停、播放
			togglePlay(){
				this.isPaused = !this.isPaused
				if(this.isPaused){
					this.video.pause()
				}else{
					this.video.play()
				}
			},
			//获取当前播放时间
			getCurrentTime(){
				this.oriCurrentTime = this.video.currentTime
				this.currentTime = this.$commonUtils.videoTimeTransfer(this.video.currentTime)	
			},
			//拖拽进度条开始
			dragProgressStart(e){
				console.log(e)
				this.inDrag = true
				let event = this.isMobile ? 'touchmove' : 'drag'
				let eventEnd = this.isMobile ? 'touchend' : 'dragend'
				let clientX = this.isMobile ? e.touches[0].clientX : e.clientX
				this.startDrag = clientX - this.progressIcon.offsetLeft
				document.addEventListener(event,this.dragProgress)
				document.addEventListener(eventEnd,this.dragProgressOver)
				
			},
			//结束拖拽
			dragProgressOver(e){
				if(!this.isMobile){
					this.dragEvent(e)
				}
				let event = this.isMobile ? 'touchmove' : 'drag'
				document.removeEventListener(event,this.dragProgress)
				this.inDrag = false
			},
			//拖拽中
			dragProgress(e){
				this.dragEvent(e)
				console.log('this.oriCurrentTime',this.oriCurrentTime)
			},
			//拖拽执行事件
			dragEvent(e){
				let nowX = this.isMobile ? e.touches[0].clientX : e.clientX
				let newX = nowX - this.startDrag
				let progressOffsetW = this.progressOffsetW 
				newX = newX < 0 ? 0 : newX
				newX = newX > progressOffsetW ? progressOffsetW : newX;
				console.log(newX)
				this.oriCurrentTime = (newX / progressOffsetW) * this.oriDuration
				this.currentTime = this.$commonUtils.videoTimeTransfer(this.oriCurrentTime)
			},
			//点击进度条
			clickProgress(e){
				if(isNaN(this.video.duration)){
					return
				}
				let progressOffsetW = this.progressOffsetW
				this.oriCurrentTime = (e.offsetX / this.progressOffsetW) * this.video.duration
				this.currentTime = this.$commonUtils.videoTimeTransfer(this.oriCurrentTime)
			},
			//全屏
			screenFull(){
				this.toggleFullScreen()
				this.isFull = !this.isFull
				if(this.isMobile){
					let width = document.body.clientWidth
					let height = document.body.clientHeight
					this.screenWidth = height
					this.screenHeight = width
				}
			}
		},
		beforeRouteLeave(to,from,next){
			this.video.removeEventListener('timeupdate',this.getCurrentTime)
			this.video.removeEventListener('canplay',this.videoCanPlay)
			let event = this.isMobile ? 'touchmove' : 'drag'
			let eventStart = this.isMobile ? 'touchstart' : 'dragstart'
			let eventEnd = this.isMobile ? 'touchend' : 'dragend'
			this.progressIcon.removeEventListener(eventStart,this.dragProgressStart)
			document.removeEventListener(event,this.dragProgress)
			document.removeEventListener(eventEnd,this.dragProgressEnd)
			next()
		}
	}
</script>

<style lang="scss" scoped>
	.video-player{
		position:relative;
		@include overSpread;
		transition:all .2s linear;
	}
	.video{
		@include overSpread;
	}
	.player-controls{
		position:absolute;
		width:100%;
		@extend .flexCenter;
		bottom: 0;
		height: 4vh;
		background: rgba(0,0,0,.2);
		z-index:2147483649;
		.pauseOrPlay{
			width:5%
		}
		.time{
			width:32%;
			font-size: 1vh;
		}
		.progress{
			width:50%;
			height: 2vh;
			background: rgba(255,255,255,.7);
			position:relative;
			.progress-in{
				height:100%
			}
			.progress-icon{
				width:2px;
				height:100%;
				position:absolute;
				background:#ccc;
				border:2px solid #666;
				top:-2px;
				@extend .cursorP
			}
		}
		.fullScreen{
			width:10%
		}
	}
	.mask{
		position:absolute;
		@include overSpread;
		top: 0;
		@extend .flexCenter;
		background:rgba(0,0,0,.2);
		i{
			font-size: 4vh;
			color:#1290BF;
			display: inline-block;
			// opacity:1;
			// transform: rotate(0deg);
			animation: rotateAni .9s linear infinite;
		}
	}
	@keyframes rotateAni{
		0%{
			opacity:1;
			transform: rotate(0deg);
		}
		25%{
			opacity:.5;
			transform: rotate(90deg);
		}
		50%{
			opacity:.2;
			transform: rotate(180deg);
		}
		75%{
			opacity:.5;
			transform: rotate(270deg);
		}
		100%{
			opacity:1;
			transform: rotate(360deg);
		}
	}
	
</style>
<style>
video::-webkit-media-controls{
    display:none !important;
}
</style>
