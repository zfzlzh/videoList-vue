<template>
	<div class="video-player">
		<!-- 视频 -->
		<video :src="preview" class="form-input-item" id="video">
			
		</video>
		<!-- 操作栏 -->
		<div class="player-controls">
			<div class="pauseOrPlay">
				<i class="fas" :class="isPaused ? 'fa-play' : 'fa-pause'"></i>
			</div>
			<div class="time">
				{{currentTime}}
				<span class="bold">/</span>
				{{duration}}
			</div>
			<div class="progress">
				<div class="progress-in"></div>
				<div class="progress-icon"></div>
			</div>
			<div class="fullScreen">
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
	export default {
		data(){
			return{
				currentTime:'00:00:00',
				duration:'00:00:00',
				inLoading:true,
				isPaused:true,
				preview:''
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.video-player{
		position:relative;
		@include overSpread;
	}
	.player-controls{
		position:absolute;
		width:100%;
		@extend .flexCenter;
		bottom: 0;
		height: 4vh;
		background: rgba(0,0,0,.2);
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
		@extend .flexCenter
	}
</style>
