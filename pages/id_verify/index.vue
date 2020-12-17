<template>
	<view style="background-color: rgb(248, 248, 248); padding: 14px;">
		<view style="background-color: rgb(255, 255, 255);">
			<u-field v-model="idInfo.name" label="姓名" placeholder="请输入">
			</u-field>

			<u-field v-model="idInfo.idType" @click="showAction" :disabled="true" label="证件类型" right-icon="arrow-down-fill">
			</u-field>

			<u-field v-model="idInfo.idNumber" label="证件号" placeholder="请输入证件号码">
			</u-field>

			<u-action-sheet @click="clickItem" :list="idTypeList" placeholder="请选择证件类型" v-model="idTypeListShow"></u-action-sheet>

		</view>

		<view class="img-upload">
			<u-upload ref="uUpload" @on-success="uploadFrontSuccess" :header="uploadHeader" upload-text="身份证正面" :action="actionFront" :auto-upload="true"
			 width="630rpx"></u-upload>
		</view>
		<view class="img-upload">
			<u-upload ref="uUpload" @on-success="uploadBackSuccess" :header="uploadHeader" upload-text="身份证反面" :action="actionBack" :auto-upload="true"
			 width="630rpx"></u-upload>
		</view>
		<u-checkbox-group v-model="agree" @change="checkboxGroupChange">
			<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in checkBoxList" :key="index" :name="item.name">{{item.name}}</u-checkbox>
		</u-checkbox-group>

		<u-button type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import api from "../../api/index.js"
	export default {
		data() {
			return {
				actionFront: `${api.baseUrl}/api/v1/account/uploadimage?image_type=id_front`,
				actionBack: `${api.baseUrl}/api/v1/account/uploadimage?image_type=id_back`,
				uploadHeader: {
					"content-type": "application/json",
					Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
				},
				idTypeListShow: false,
				idTypeList: [{
						text: '身份证'
					},
					{
						text: '护照'
					}
				],
				idInfo: {
					name: "",
					idType: "",
					idNumber: "",
					idFrontUrl: "",
					idBackUrl: "",
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
				this.idInfo.idFrontUrl = data.data
			},
			uploadBackSuccess(data, index, lists, name) {
				console.log(data, index, lists, name, "uploadBackSuccess")
				this.idInfo.idBackUrl = data.data
			}
		}
	}
</script>

<style>
	.img-upload {
		padding: 24rpx;
		background-color: rgb(255, 255, 255);
	}
</style>
