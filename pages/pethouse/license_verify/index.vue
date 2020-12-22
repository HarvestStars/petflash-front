<template>
	<view style="background-color: rgb(248, 248, 248); padding: 14px;">
		<view style="background-color: rgb(255, 255, 255);">
			<u-field v-model="certfi.level" label="专业资质" placeholder="请输入">
			</u-field>
		</view>

		<u-row>
			<u-col :span="6">
				<view style="background-color: rgb(255, 255, 255);">
					<u-upload max-count="1" ref="uUpload-Front" @on-success="uploadFrontSuccess" :header="uploadHeader" upload-text="门面照" name="environment_front" :action="actionFront" :auto-upload="true" width="315rpx"></u-upload>
				</view>
			</u-col>
			<u-col :span="6">
				<view style="background-color: rgb(255, 255, 255);">
					<u-upload max-count="1" ref="uUpload-Back" @on-success="uploadBackSuccess" :header="uploadHeader" upload-text="店内环境" name="environment_inside" :action="actionBack" :auto-upload="true" width="315rpx"></u-upload>
				</view>
			</u-col>
		</u-row>

		<view class="img-upload">
			<u-upload max-count="1" ref="uUpload-Permiss" @on-success="uploadPermissSuccess" :header="uploadHeader" upload-text="营业执照" name="license_front" :action="actionPermiss" :auto-upload="true" width="630rpx"></u-upload>
		</view>

		<!--
		<u-checkbox-group v-model="agree" @change="checkboxGroupChange">
			<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in checkBoxList" :key="index" :name="item.name">{{item.name}}</u-checkbox>
		</u-checkbox-group>
		-->
		<u-button type="primary" @click="submit">认证信息</u-button>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	export default {
		data() {
			return {
				actionFront: `${api.baseUrl}/api/v1/account/uploadimage?image_type=house_license`,
				actionBack: `${api.baseUrl}/api/v1/account/uploadimage?image_type=house_license`,
				actionPermiss: `${api.baseUrl}/api/v1/account/uploadimage?image_type=house_license`,
				uploadHeader: {
					"content-type": "application/json",
					Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
				},
				certfi: {
					level: this.$store.getters.userInfo.user_type,
					certfiFrontUrl: "",
					certfiBackUrl: "",
					certfiPermissUrl: ""
				},
				checkBoxList: [{
					name: '已阅读并同意《xxx用户协议》',
					checked: false,
					disabled: false
				}],
				agree: ""
			}
		},
		methods: {
			submit(e) {
				console.log(e, "submit")
			},
			showAction() {
				this.idTypeListShow = true;
			},
			clickItem(index) {
				this.idInfo.idType = this.idTypeList[index].text;
			},
			checkboxGroupChange(e) {
				console.log("checkboxGroupChange", e);
			},
			checkboxChange(e) {
				console.log("radioChange", e)
			},
			uploadFrontSuccess(data, index, lists, name) {
				console.log(data, index, lists, name, "uploadFrontSuccess")
				this.certfi.certfiFrontUrl = data.data
			},
			uploadBackSuccess(data, index, lists, name) {
				console.log(data, index, lists, name, "uploadBackSuccess")
				this.certfi.certfiBackUrl = data.data
			},
			uploadPermissSuccess(data, index, lists, name) {
				console.log(data, index, lists, name, "uploadPermissSuccess")
				this.certfi.certfiPermissUrl = data.data
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
