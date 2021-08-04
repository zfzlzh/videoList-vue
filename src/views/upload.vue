<template>
	<div class="upload-file">
		<div class="form-item">
			<span>上传：</span>
			<div class="form-input">
				<div @click="choiceFile" class="button file">选择文件</div>
				<input type="file" class="form-input" id="fileField" @change="changeFile" v-show="false" />
			</div>
		</div>
		<div class="form-item">
			<span>名称：</span>
			<div class="form-input">
				<input type="text" class="form-input-item" :value="fileName" />
			</div>
		</div>
		<div class="form-item">
			<span>预览：</span>
			<div class="form-input video">
				<video :src="preview" controls class="form-input-item" id="video">
					
				</video>
			</div>
		</div>
		<div class="form-item">
			<span>类型：</span>
			<div class="form-input">
				<meSelect
					:optionList="typeList"
				>
				</meSelect>
			</div>
		</div>
		<div class="form-item">
			<span>标签：</span>
			<div class="form-input">
				<meSelect
					:optionList="tagList"
					:mulite="true"
				>
				</meSelect>
			</div>
		</div>
		<div class="form-item">
			<span>描述：</span>
			<div class="form-input">
				<input type="textarea" :value="remark" class="form-input-item">
			</div>
		</div>
		<div class="btn-div">
			<div @click="saveFile" class="button save">保存</div>
			<div @click="exportJson" class="button export">导出json</div>
		</div>
	</div>
</template>

<script>
	import meSelect from '../components/selfCom/me-select.vue'
	export default{
		data(){
			return{
				preview:'',
				fileName:'',
				fileType:'',
				fileTags:[],
				remark:'',
				tagList:[
					{label:'xxx',value:'aaa'},
					{label:'xxx2',value:'aaa2'},
					{label:'xxx3',value:'aaa3'},
					{label:'xxx4',value:'aaa4'},
					{label:'xxx5',value:'aaa5'},
					{label:'xxx6',value:'aaa6'},
				],
				typeList:[],
				saveFileObj:{}
			}
		},
		components:{
			meSelect
		},
		methods:{
			//保存文件数据
			saveFile(){
				if(!this.saveFileObj[this.fileType]){
					this.saveFileObj[this.fileType] = []
				}
				this.saveFileObj[this.fileType].push({
					fileName:this.fileName,
					fileTags:this.fileTags,
					fileType:this.fileType,
					remark:this.remark,
					preview:this.preview,
					cover:this.getVideoBase64()
				})
			},
			//点击选择文件
			choiceFile(){
				document.getElementById('fileField').click()
			},
			//选择文件获取地址
			changeFile(e){
				let dom = e.srcElement.files[0]
				let src = window.URL.createObjectURL(dom)
				this.fileName = dom.name
				this.preview = src
			},
			//选择类型
			changeType(e){
				
			},
			//选择标签
			changeTag(e){
				console.log(e)
			},
			//导出json
			exportJson(res,fileName){
				let data = typeof res == 'object' ? JSON.stringify(res,undefined,4) : data
				let blob = new Blob([data], { type: "text/json" })
				let a = document.createElement("a")
				a.download = fileName ? fileName : 'export.json'
				a.href = window.URL.createObjectURL(blob);
				a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
				let event = new MouseEvent('click');
				a.dispatchEvent(event);
			},
			//获取视频第一帧未封面图片
			getVideoBase64(url) {
				return new Promise(function (resolve, reject) {
					let dataURL = '';
					let video = document.getElementById('video');
					video.setAttribute('crossOrigin', 'anonymous');//处理跨域
					video.addEventListener('loadeddata', function () {
						let canvas = document.createElement("canvas"),
							width = video.width, //canvas的尺寸和图片一样
							height = video.height;
						canvas.width = width;
						canvas.height = height;
						canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
						dataURL = canvas.toDataURL('image/png'); //转换为base64
						resolve(dataURL);
					});
				})
			}
		},
	}
	
</script>

<style lang="scss">
	.upload-file{
		@extend .flexVerCenter;
		flex-direction: column;
	}
	.video{
		.form-input-item{
			padding:0
		}
	}
	.btn-div{
		width:100%;
		@extend .flexCenter
	}
	
</style>
