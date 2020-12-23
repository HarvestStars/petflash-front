<template>
	<view style="background-color: rgb(248, 248, 248); padding: 14px;">
		<view v-if="userType===1">
			<view class="img-upload">
				<view v-if="frontPrefix">
					<u-upload ref="uUpload" max-count="1" @on-success="uploadFrontSuccess" :header="uploadHeader" name="id_front" 
					upload-text="身份证正面" :action="action" :file-list="housefrontList" :auto-upload="true" 
					width="630rpx"
					></u-upload>
					</view>
				<view v-else>
					<u-upload ref="uUpload" max-count="1" @on-success="uploadFrontSuccess" :header="uploadHeader" name="id_front" 
					upload-text="身份证正面" :action="action" :auto-upload="true"
					width="630rpx"
					></u-upload>
				 </view>
			</view>
			<view class="img-upload">
				<view v-if="backPrefix">
					<u-upload ref="uUpload" max-count="1" @on-success="uploadBackSuccess" :header="uploadHeader" name="id_back" 
					upload-text="身份证背面" :action="action" :file-list="housebackList" :auto-upload="true"
					width="630rpx"
					></u-upload>
				</view>
				<view v-else>
					<u-upload ref="uUpload" max-count="1" @on-success="uploadBackSuccess" :header="uploadHeader" name="id_back"
					upload-text="身份证背面" :action="action" :auto-upload="true"
					width="630rpx"
					></u-upload>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="img-upload">
				<view v-if="frontPrefix">
					<u-upload ref="uUpload" max-count="1" @on-success="uploadFrontSuccess" :header="uploadHeader" name="id_front" 
					upload-text="身份证正面" :action="action" :file-list="groomerfrontList" :auto-upload="true"
					width="630rpx"
					></u-upload>
				</view>
				<view v-else>
					<u-upload ref="uUpload" max-count="1" @on-success="uploadFrontSuccess" :header="uploadHeader" name="id_front" 
					upload-text="身份证正面" :action="action" :auto-upload="true"
					width="630rpx"
					></u-upload>
				</view>
			</view>
			<view v-if="backPrefix">
				<view class="img-upload">
					<u-upload ref="uUpload" max-count="1" @on-success="uploadBackSuccess" :header="uploadHeader" name="id_back" 
					upload-text="身份证背面" :action="action" :file-list="groomerbackList" :auto-upload="true"
					 width="630rpx"
					 ></u-upload>
				</view>
			</view>
			<view v-else>
				<view class="img-upload">
					<u-upload ref="uUpload" max-count="1" @on-success="uploadBackSuccess" :header="uploadHeader" name="id_back" 
					upload-text="身份证背面" :action="action" :auto-upload="true"
					 width="630rpx"
					 ></u-upload>
				</view>
			</view>
		</view>
		
		<!-- 
		<u-checkbox-group v-model="agree" @change="checkboxGroupChange">
			<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in checkBoxList" :key="index" :name="item.name">{{item.name}}</u-checkbox>
		</u-checkbox-group>
		-->
		<u-button type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	export default {
		data() {
			return {
				action: `${api.baseUrl}/api/v1/account/uploadimage?image_type=id_card`,
				housefrontList:[
					{url: `${api.baseUrl}${this.$store.getters.userInfo.id_card_front}`+"?user_type=pethouse"}
				],
				housebackList:[
					{url: `${api.baseUrl}${this.$store.getters.userInfo.id_card_back}`+"?user_type=pethouse"}
				],
				groomerfrontList:[
					{url: `${api.baseUrl}${this.$store.getters.userInfo.id_card_front}`+"?user_type=groomer"}
				],
				groomerbackList:[
					{url: `${api.baseUrl}${this.$store.getters.userInfo.id_card_back}`+"?user_type=groomer"}
				],
				uploadHeader: {
					"content-type": "application/json",
					Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
				},
				
				frontPrefix: this.$store.getters.userInfo.id_card_front != "" ? true : false,
				backPrefix: this.$store.getters.userInfo.id_card_back != "" ? true : false,
				userType: this.$store.getters.userInfo.user_type
			}
		},
		methods: {
			submit() {
				console.log("确认上传");
				uni.navigateBack();
			},
			
			uploadFrontSuccess(data, index, lists, name) {
				let userInfo = Object.assign(this.$store.getters.userInfo, {
					id_card_front: data.data.front
				})
				this.$store.dispatch("user/updateUserInfo", userInfo)
				console.log(this.$store)
				console.log(data, index, lists, name, "uploadFrontSuccess")
			},
			
			uploadBackSuccess(data, index, lists, name) {
				let userInfo = Object.assign(this.$store.getters.userInfo, {
					id_card_back: data.data.back
				})
				this.$store.dispatch("user/updateUserInfo", userInfo)
				console.log(this.$store)
				console.log(data, index, lists, name, "uploadBackSuccess")
			}
			//checkboxGroupChange(e) {
			//	console.log("checkboxGroupChange", e);
			//},
			//checkboxChange(e) {
			//	console.log("radioChange", e)
			//},
		}
	}
</script>

<style>
	.img-upload {
		padding: 24rpx;
		background-color: rgb(255, 255, 255);
	}
</style>
