<template>
	<div class="me-scrollbar">
		<div class="me-scrollbar-wrap" :class="direction">
			<div class="me-scrollbar-view">
				<slot></slot>
			</div>
		</div>
		<div class="me-scrollbar-scroll ver">
			<div 
				data-dire="ver"
				class="me-scrollbar-item" 
				:style="{height: scrollbarVerH,transform:('translateY(' + translateY + '%)')}"
			>
			</div>
		</div>
		<div class="me-scrollbar-scroll hor">
			<div 
				data-dire="hor"
				class="me-scrollbar-item" 
				:style="{width: scrollbarHorW,transform:'translateX(' + translateX + '%)'}"
			>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			direction:{
				type:String,
				default:'ver'
			}
		},
		data(){
			return{
				scrollbarVerH:0,
				scrollbarHorW:0,
				browser:'',
				translateX:0,
				translateY:0,
				//滚动条记录
				startScroll:{
					ver:'',
					hor:''
				},
				endScroll:{
					ver:'',
					hor:''
				},
				wrap:'',
				scrollVer:'',
				scrollHor:'',
				nowMouseDown:'',
				scrollbarDivHor:'',
				scrollbarDivVer:'',
				allowScroll:false
			}
		},
		mounted(){
			this.browser = this.$store.state.browser
			this.$nextTick(()=>{
				this.init()
			})
		},
		methods:{
			//初始计算滚动条高度
			init(){
				let box = document.querySelector('.me-scrollbar')
				let slot = document.querySelector('.me-scrollbar-view')
				this.wrap = document.querySelector('.me-scrollbar-wrap')
				if(['all','ver'].includes(this.direction)){
					this.scrollbarDivVer = document.querySelector('.me-scrollbar-scroll.ver')
					this.scrollVer = this.scrollbarDivVer.querySelector('.me-scrollbar-item')
					let boxH = box.scrollHeight
					let slotH = slot.offsetHeight 
					let scrollbarDivH = this.scrollbarDivVer.offsetHeight
					//计算滚动条高度，外层容器的高度 / 内容容器的高度 * 滚动条框的高度
					console.log(boxH,slotH,scrollbarDivH)
					this.scrollbarVerH = parseInt(boxH/slotH*scrollbarDivH) + 'px'
				}
				if(["all","hor"].includes(this.direction)){
					this.scrollbarDivHor = document.querySelector('.me-scrollbar-scroll.hor')
					this.scrollHor = this.scrollbarDivHor.querySelector('.me-scrollbar-item')
					let boxW = box.scrollWidth
					let slotW = slot.offsetWidth
					let scrollbarDivW = this.scrollbarDivHor.offsetWidth
					//计算滚动条宽度，外层容器的宽度 / 内容容器的宽度 * 滚动条框的宽度
					let width = parseInt(boxW/slotW*scrollbarDivW)
					width = width == parseInt(scrollbarDivW) ? 0 : width
					this.scrollbarHorW = width  + 'px'
				}
				this.listenerCreate()
			},
			//开启监听事件
			listenerCreate(){
				this.wrap.addEventListener('scroll',this.listenMouseWheel)
				console.log(this.scrollVer)
				if(this.scrollVer){
					this.scrollVer.addEventListener('mousedown',this.mousedownScrollbar)
				}
				if(this.scrollHor){
					this.scrollHor.addEventListener('mousedown',this.mousedownScrollbar)
				}
			},
			linstenMoveAndUp(e){
				e.stopImmediatePropagation()
				if(this.scrollVer){
					this.scrollVer.addEventListener('mousemove',this.mousemoveScrollbar)
					this.scrollVer.addEventListener('mouseup',this.mouseupScrollbar)
				}
				if(this.scrollHor){
					this.scrollHor.addEventListener('mousedmove',this.mousemoveScrollbar)
					this.scrollHor.addEventListener('mouseup',this.mouseupScrollbar)
				}
			},
			//监听鼠标滚轮事件
			listenMouseWheel(event){
				let translateY = (this.wrap.scrollTop *100 / this.wrap.clientHeight)
				this.translateY = translateY > 100 ? 100 : translateY
				this.endScroll['ver'] = this.wrap.scrollTop
			},
			//监听鼠标按下滚动条事件
			mousedownScrollbar(event){
				console.log(event)
				this.allowScroll = true
				let dire = event.target.dataset.dire
				this.nowMouseDown = dire
				let pageNum = dire == 'ver' ? event.pageY : event.pageX
				this.startScroll[dire] = pageNum
				this.linstenMoveAndUp(event)
			},
			//监听鼠标滑动滚动条事件
			mousemoveScrollbar(event){
				console.log(this.allowScroll)
				if(!this.allowScroll){
					return
				}
				let pageNum = this.nowMouseDown == 'ver' ? event.pageY : event.pageX 
				let scrollNum = pageNum - this.startScroll[this.nowMouseDown] + this.endScroll[this.nowMouseDown]
				let max = this.nowMouseDown == 'ver' ? 
											this.scrollbarDivVer.clientHeight : 
											this.scrollbarDivHor.clientWidth
				scrollNum = scrollNum < 0 ? 0 : scrollNum > max ? max : scrollNum
				let translate = (scrollNum * 100 / max)
				if(this.nowMouseDown == 'ver'){
					this.translateY = translate
					this.wrap.scrollTop = scrollNum
				}
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
			},
			//监听鼠标松开滚动条事件
			mouseupScrollbar(event){
				let scrollNum = this.nowMouseDown == 'ver' ? 
								this.wrap.scrollTop : 
								this.wrap.scrollLeft
				this.endScroll[this.nowMouseDown] = scrollNum
				this.allowScroll = false
			},
		},
		beforeRouteLeave(to,from,next){
			document.querySelector('.me-scrollbar-wrap').removeEventListener('scroll',this.listenMouseWheel)
			next()
		},
	}
</script>

<style lang="scss">
	.me-scrollbar{
        @include overSpread;
		overflow: hidden;
		position:relative
    }
    .me-scrollbar-wrap{
        height: 100%;
		overflow: scroll;
		margin-right: -17px;
		margin-bottom:-17px !important;
		&.ver{
			overflow-x: hidden;
		}
		&.hor{
			overflow-y: hidden;
		}
    }
    .me-scrollbar-scroll{
        background-color: transparent;
        cursor: pointer;
        position: absolute;
		
		transition: opacity 120ms ease-out;
		border-radius: 4px;
		.me-scrollbar-item{
		    background-color: #00B0E8;
		    border-radius: 15px;
		    position: relative;
			transition: .3s background-color;
		}
		&.ver{
			height:100%;
			width: 7px;
			right:1px;
			top:0;
			.me-scrollbar-item{
				width: 100%;
			}
		}
		&.hor{
			width:100%;
			height: 7px;
			right:1px;
			bottom:0;
			.me-scrollbar-item{
				height: 100%;
			}
		}
    }
    
</style>
