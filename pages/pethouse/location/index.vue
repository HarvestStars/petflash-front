<template>
	<view style="padding: 24rpx;">
		<view>
			<view class="u-demo-wrap">
				<view class="u-demo-title">区域选择</view>
				<view class="u-demo-area">
					<view>{{ input ? input : '地区选择' }}</view>
				</view>
				<u-picker
					mode="region" 
					v-model="show" 
					@confirm="confirm"
					:area-code='["31", "3101", "310101"]' 
					:params="params"
					></u-picker>
			</view>
			<u-button @click="show = true">地区选择</u-button>
		</view>
		</u-field>
		<u-field v-model="address" label="具体地址" placeholder="请输入">
		</u-field>
		<u-button type="primary" @click="submit">提交</u-button>
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
				
				show: false,
				input: '区域选择',
				city: "",
				region: "",
				address: ""
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
						city: this.city,
						region: this.region,
						location: this.address
					},
					success: ({data}) => 
					{
						console.log(data.data, this.$store)
						this.$store.dispatch("user/updateUserInfo", {region: this.region})
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

</style>
