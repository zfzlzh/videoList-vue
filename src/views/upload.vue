<template>
	<div class="upload-file">
		<div class="form-item">
			<span>上传：</span>
			<div class="form-input">
				<div @click="choiceFile" class="button file">选择文件</div>
				<input type="file" class="form-input" id="fileField" @change="changeFile" v-show="false" />
			</div>
		</div>
		<div class="info-content">
			<meScrollbar>
				<div class="info-content-item" v-for="item in videoList" :key="item.index">
					<div class="form-item">
						<span>名称：</span>
						<div class="form-input">
							<input type="text" class="form-input-item" :value="item.fileName" />
						</div>
					</div>
					<div class="form-item">
						<span>预览：</span>
						<div class="form-input video">
							<video :src="item.preview" controls class="form-input-item" :id="'video' + item.index">
								
							</video>
						</div>
					</div>
					<div class="form-item">
						<span>类型：</span>
						<div class="form-input">
							<meSelect
								:optionList="typeList"
								v-model="item.fileType"
							>
							</meSelect>
						</div>
					</div>
					<div class="form-item">
						<span>地区：</span>
						<div class="form-input">
							<meSelect
								:optionList="regionList"
								v-model="item.regionId"
							>
							</meSelect>
						</div>
					</div>
					<div class="form-item">
						<span>标签：</span>
						<div class="form-input">
							<meSelect
								:optionList="tagList"
								v-model="item.fileTags"
								:mulite="true"
							>
							</meSelect>
						</div>
					</div>
					<div class="form-item">
						<span>描述：</span>
						<div class="form-input">
							<input type="textarea" :value="item.remark" class="form-input-item">
						</div>
					</div>
				</div>
			</meScrollbar>
		</div>
		<div class="btn-div">
			<div @click="saveFile" class="button save">保存</div>
			<div @click="exportJson" class="button export">导出json</div>
		</div>
	</div>
</template>

<script>
	import meSelect from '../components/selfCom/me-select.vue'
	import meScrollbar from '../components/selfCom/me-scrollbar.vue'
	import JsZip from "jszip"
	export default{
		data(){
			return{
				tagList:[
					{label:'xxx',value:'aaa'},
					{label:'xxx2',value:'aaa2'},
					{label:'xxx3',value:'aaa3'},
					{label:'xxx4',value:'aaa4'},
					{label:'xxx5',value:'aaa5'},
					{label:'xxx6',value:'aaa6'},
				],
				typeList:[],
				regionList:[],
				saveFileObj:{},
				videoTypeList:[
					"avi","wmv","mpg","mpeg","mov","rm","ram","swf","flv","mp4","mp3","wma","avi","rm","rmvb","flv","mpg","mkv"
				],
				videoList:[]
			}
		},
		components:{
			meSelect,
			meScrollbar
		},
		methods:{
			//保存文件数据
			saveFile(){
				this.videoList.forEach((val)=>{
					if(!this.saveFileObj[val.fileType]){
						this.saveFileObj[val.fileType] = []
					}
					this.saveFileObj[val.fileType].push({
						fileName:val.fileName,
						fileTags:val.fileTags,
						fileType:val.fileType,
						remark:val.remark,
						preview:val.preview,
						regionId:val.regionId,
						cover:this.getVideoBase64(val.index)
					})
					localStorage.setItem('videoPreview',val.preview)
				})
				this.$axios.post('/videos/createJson',{videoList:this.saveFileObj}).then((res)=>{
					console.log(res)
				})
			},
			//点击选择文件
			choiceFile(){
				document.getElementById('fileField').click()
			},
			//选择文件获取地址
			changeFile(e){
				console.log(e)
				let dom = e.srcElement.files[0]
				if(dom.type == 'application/zip'){
					// 读取zip
					JsZip.loadAsync(dom).then((zip) => {
						console.log(zip)
						// 循环文件数组
						Object.values(zip.files).forEach((item)=>{
							// 将每个视频文件都转化为blob，用于创建视频地址
							let nameEnd = item.name.split('.')[1]
							if(nameEnd && this.videoTypeList.includes(nameEnd)){
								zip.file(item.name).async("blob").then((blob)=>{
									this.getFileUrl(blob,item.name)
								})
							}
						})
						
					});
				}else{
					this.getFileUrl(dom)
					var formData = new FormData();
					formData.append('muliteVideos', dom);
					this.$axios.post('/videos/uploadFile',formData).then((res)=>{
						console.log(res)
					})
				}
				
			},
			getFileUrl(dom,name){
				//dom为file对象、blob对象或者MediaSource 对象
				let src = window.URL.createObjectURL(dom)
				console.log(dom)
				// this.fileName = dom.name
				// this.preview = src
				let index = this.videoList[this.videoList.length - 1] ? this.videoList[this.videoList.length - 1].index + 1 : 0
				this.videoList.push(
					{
						preview:src,
						fileName:dom.name ? dom.name : name ? name : '视频' + Math.ceil(Math.random() * 10000),
						fileType:'',
						fileTags:[],
						regionId:'',
						remark:'',
						index
					}
				)
				console.log(this.videoList)
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
				this.$axios.post('/files/localFileToJson',{
					path:'E:\\AOS\\IoT\\SourceCode\\Frontend\\aos-portal-webui\\src\\views\\dashBoard',
					name:'test'
				}).then((res)=>{

				})
				// console.log(res)
				// let data = typeof this.saveFileObj == 'object' ? JSON.stringify(this.saveFileObj,undefined,4) : this.saveFileObj
				// let blob = new Blob([data], { type: "text/json" })
				// let a = document.createElement("a")
				// a.download = fileName ? fileName : 'export.json'
				// a.href = window.URL.createObjectURL(blob);
				// a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
				// let event = new MouseEvent('click');
				// a.dispatchEvent(event);
			},
			//获取视频第一帧未封面图片
			getVideoBase64(index) {
				return new Promise(function (resolve, reject) {
					let dataURL = '';
					let video = document.getElementById('video' + index);
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
	.info-content{
		width:100%;
		// @include flex;
		// overflow: hidden
		.info-content-item{
			padding:20px;
			border-top:1px solid #ccc;
			border-bottom:1px solid #ccc
		}
	}
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
