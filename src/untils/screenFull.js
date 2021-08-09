const screenFull = {
    data(){
        return{
            screenDom: null,
            nowIsFull:false
        }
    },
    methods:{
        //判断当前是否为全屏状态
        checkFull() {
            let arr = [document.fullscreenEnabled, window.fullScreen, document.webkitIsFullScreen, document.msFullscreenEnabled];
            arr = arr.filter((val) => {
                return typeof val === "boolean";
            });
            const num = arr.reduce((prev, next) => {
                return prev + next;
            });
            return num == arr.length;
        },
        //监听获取是否全屏状态
        isFullScreenNow() {
            this.nowIsFull = this.checkFull();
            this.$emit("toggleScreenState", this.nowIsFull);
            //如果标准页面是无菜单栏状态，更改为有菜单栏状态，防止样式变形
        },
        //全屏或者返回标准屏
        toggleFullScreen() {
			console.log('this.nowIsFull',this.nowIsFull)
            if (this.nowIsFull) {
                this.exitFullscreen();
            } else {
                this.toFullScreen();
            }
        },
        //全屏
        toFullScreen() {
            if (!this.screenDom){
                this.screenDom = document.querySelector("body")
            }
            this.nowIsFull = true
            if (this.screenDom.requestFullscreen) {
                return this.screenDom.requestFullscreen();
            } else if (this.screenDom.webkitRequestFullScreen) {
                return this.screenDom.webkitRequestFullScreen();
            } else if (this.screenDom.mozRequestFullScreen) {
                return this.screenDom.mozRequestFullScreen();
            } else {
                return this.screenDom.msRequestFullscreen();
            }
        },
        //退出全屏
        exitFullscreen() {
            this.nowIsFull = false;
            if (document.exitFullscreen) {
                return document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                return document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                return document.webkitCancelFullScreen();
            } else {
                return document.msExitFullscreen();
            }
        }
    }
}
export default screenFull

