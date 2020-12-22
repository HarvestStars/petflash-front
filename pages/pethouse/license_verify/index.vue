<template>
	<view style="background-color: rgb(248, 248, 248); padding: 14px;">
		<u-row>
			<u-col :span="6">
				<view style="background-color: rgb(255, 255, 255);">
					<u-upload ref="uUpload" max-count="1" @on-success="uploadFrontSuccess" :header="uploadHeader" 
					upload-text="门面照" name="environment_front" :action="action" :auto-upload="true" :file-list="fileListFront" 
					width="315rpx"></u-upload>
				</view>
			</u-col>
			<u-col :span="6">
				<view style="background-color: rgb(255, 255, 255);">
					<u-upload ref="uUpload" max-count="1" @on-success="uploadBackSuccess" :header="uploadHeader" 
					upload-text="店内环境" name="environment_inside" :action="action" :auto-upload="true" :file-list="fileListInside" 
					width="315rpx"></u-upload>
				</view>
			</u-col>
		</u-row>
		
		<view class="img-upload">
			<u-upload max-count="1" ref="uUpload-Permiss" @on-success="uploadPermissSuccess" :header="uploadHeader" 
			upload-text="营业执照" name="license_front" :action="action" :auto-upload="true" :file-list="fileListLicense" 
			width="630rpx" height="500rpx"
			></u-upload>
		</view>
		<u-button type="primary" @click="submit">认证信息</u-button>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	export default {
		data() {
			return {
				action: `${api.baseUrl}/api/v1/account/uploadimage?image_type=house_license`,	
				
				fileListFront: [
					{
						url: `${api.baseUrl}${this.$store.getters.userInfo.environment_front}`,
					}
				],
				
				fileListInside: [
					{
						url: `${api.baseUrl}${this.$store.getters.userInfo.environment_inside}`,
					}
				],
							
				fileListLicense: [
					{
						url: `${api.baseUrl}${this.$store.getters.userInfo.license}`,
					}
				],
				
				uploadHeader: {
					"content-type": "application/json",
					Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
				}
			}
		},
		methods: {
			submit(e) {
				console.log(e, "submit")
				uni.navigateBack();
			},
			uploadFrontSuccess(data, index, lists, name) {
				console.log("更新正面照")
				let userInfo = Object.assign(this.$store.getters.userInfo, {
					environment_front: data.data.front
				})
				this.$store.dispatch("user/updateUserInfo", userInfo)
				console.log(data, index, lists, name, "uploadFrontSuccess")
			},
			uploadBackSuccess(data, index, lists, name) {
				console.log("更新环境照")
				let userInfo = Object.assign(this.$store.getters.userInfo, {
					environment_inside: data.data.inside
				})
				this.$store.dispatch("user/updateUserInfo", userInfo)
				console.log(data, index, lists, name, "uploadBackSuccess")
			},
			uploadPermissSuccess(data, index, lists, name) {
				console.log("更新营业执照")
				let userInfo = Object.assign(this.$store.getters.userInfo, {
					license: data.data.license
				})
				this.$store.dispatch("user/updateUserInfo", userInfo)
				console.log(data, index, lists, name, "uploadLicenseSuccess")
			}	
		}
	}
</script>

<style>
	.img-upload {
		padding: 12rpx;
		background-color: rgb(255, 255, 255);
	}
</style>
