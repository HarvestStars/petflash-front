<template>
	<view class="wrap">
		<u-form ref="uForm" label-width="180">
			<u-form-item label="门店名称">
				<u-input v-model="nick_name" placeholder="请输入" input-align="right"></u-input>
			</u-form-item>


			<u-form-item label="区域选择" >
				<u-input placeholder="请选择门店所在区域" v-model="input" type="select" input-align="right" @click="show = true" />
				<u-picker
					mode="region" 
					v-model="show" 
					@confirm="confirm"
					:area-code='["31", "3101", "310101"]' 
					:params="params"
					></u-picker>
			</u-form-item>
			<u-form-item label="具体地址">
				<u-input v-model="address" placeholder="请输入" input-align="right"></u-input>
			</u-form-item>
			<text>\n</text>
			<view>
				<u-button type="warning" @click="submit">提交</u-button>
			</view>
		</u-form>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	export default {
		data() {
			return {
				params: {
					province: true,
					city: true,
					area: true
				},
				
				nick_name: `${this.$store.getters.userInfo.nick_name}`,
				show: false,
				input: `${this.$store.getters.userInfo.city} - ${this.$store.getters.userInfo.region}`,
				city: `${this.$store.getters.userInfo.city}`,
				region: `${this.$store.getters.userInfo.region}`,
				address: `${this.$store.getters.userInfo.location}`
			}
		},
		computed: {
			roles() {
				return this.$store.getters.requireRols
			},
			userType(){
				return this.$store.getters.userInfo.user_type
			}
		},
		methods: {
			submit() {
				uni.request({
					url: `${api.baseUrl}/api/v1/account/uploadpethouse`,
					method: "POST",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					data: {
						nick_name: this.nick_name,
						city: this.city,
						region: this.region,
						location: this.address
					},
					success: ({data}) => 
					{
						let userInfo = Object.assign(this.$store.getters.userInfo, {
							nick_name: this.nick_name,
							city: this.city, 
							region: this.region, 
							location: this.address})
						this.$store.dispatch("user/updateUserInfo", userInfo)
						console.log(data.data, this.$store)
						uni.navigateBack()
					}
				})
			},
			confirm(e) {
				this.city = (e.city.label === "市辖区") ? e.province.label : e.city.label;
				this.region = e.area.label;
				if (e.city.label === "市辖区"){
					this.input = e.province.label + '-' + e.area.label;
				}else{
					this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				}
			}
		}
	}
</script>

<style>
	.wrap {
		padding: 30rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}
</style>
