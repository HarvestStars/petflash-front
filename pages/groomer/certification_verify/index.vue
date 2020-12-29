<template>
	<view class="wrap">
		<u-form ref="uForm" label-width="180">
			<u-form-item label="资质选择" >
				<u-input placeholder="选择您的专业资质" v-model="quaStr" type="select" input-align="right" @click="show = true" />
				<u-select v-model="show" :list="levelList" @confirm="confirm"></u-select>
			</u-form-item>
			
			<u-form-item>
				<view v-if="frontPrefix">
					<view class="img-upload">
						<u-upload ref="uUpload-Permiss" max-count="1" @on-success="uploadPermissSuccess" :header="uploadHeader" 
						upload-text="资质证书(美助为选填)" name="certifi_front" :action="action" :auto-upload="true" 
						:file-list="certifiFrontList" 
						width="630rpx"></u-upload>
					</view>
				</view>
				<view v-else>
					<view class="img-upload">
						<u-upload ref="uUpload-Permiss" max-count="1" @on-success="uploadPermissSuccess" :header="uploadHeader" 
						upload-text="资质证书(美助为选填)" name="certifi_front" :action="action" :auto-upload="true"
						width="630rpx"></u-upload>
					</view>
				</view>
			</u-form-item>
			<text>\n</text>
			<u-button type="warning" @click="submit">提交认证</u-button>
		</u-form>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	export default {
		data() {
			return {
				show: false,
				levelList: [
					{
						value: 1,
						label: '助理级'
					},
					{
						value: 2,
						label: 'C级'
					},
					{
						value: 3,
						label: 'B级'
					},
					{
						value: 4,
						label: 'A级'
					},
					{
						value: 5,
						label: 'A级以上'
					}
				],
				qualification: this.$store.getters.userInfo.qualification,
				quaStr: "",
				action: `${api.baseUrl}/api/v1/account/uploadimage?image_type=certificate`,
				uploadHeader: {
					"content-type": "application/json",
					Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
				},
				certifiFrontList: [
					{
						url: `${api.baseUrl}${this.$store.getters.userInfo.certificate_front}`,
					}
				],
				frontPrefix: this.$store.getters.userInfo.certificate_front != "" ? true : false,
			}
		},
		
		onShow: function(){
			switch (this.qualification) {
			  case 1:
				this.quaStr = "助理级"; 
				break
			  case 2:
				this.quaStr = "C级"; 
				break
			  case 3:
				this.quaStr = "B级"; 
			    break
			  case 4:
				this.quaStr = "A级"; 
				break
			  case 5:
				this.quaStr = "A级以上"; 
				break
			  default :
			  this.quaStr = "";
			}
		},
		
		methods: {
			submit(e) {
				uni.request({
					url: `${api.baseUrl}/api/v1/account/uploadgroomer`,
					method: "POST",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					data: {
						qualification: parseInt(this.qualification)
					},
					success: ({data}) => 
					{
						let userInfo = Object.assign(this.$store.getters.userInfo, {
							qualification: this.qualification,
							})
						this.$store.dispatch("user/updateUserInfo", userInfo)
						console.log(data.data, this.$store)
						uni.navigateBack()
					}
				})
			},
			uploadPermissSuccess(data, index, lists, name) {
				console.log("更新资质证书")
				let userInfo = Object.assign(this.$store.getters.userInfo, {
					certificate_front: data.data.front
				})
				this.$store.dispatch("user/updateUserInfo", userInfo)
				console.log(data, index, lists, name, "uploadFrontSuccess")
			},
			confirm(e) {
				console.log("确认结果",e)
				console.log("确认结果",e[0].value)
				this.qualification = e[0].value
				this.quaStr = e[0].label
				let userInfo = Object.assign(this.$store.getters.userInfo, {
					qualification: this.qualification
				})
				this.$store.dispatch("user/updateUserInfo", userInfo)				
			}
		}
	}
</script>

<style>
	.img-upload {
		padding: 12rpx;
		background-color: rgb(255, 255, 255);
	}
	
	.wrap {
		padding: 30rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}
</style>
