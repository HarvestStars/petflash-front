<template>
	<view class="wrap">
		<u-form ref="uForm" label-width="180">
			<u-form-item label="用户昵称">
				<u-input v-model="nick_name" label="用户昵称" placeholder="请输入昵称" input-align="right"></u-input>
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
				
				nick_name: this.$store.getters.userInfo.nick_name ? this.$store.getters.userInfo.nick_name : "",
			}
		},
		methods: {
			submit() {
				uni.request({
					url: `${api.baseUrl}/api/v1/account/uploadgroomer`,
					method: "POST",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					data: {
						nick_name: this.nick_name
					},
					success: ({data}) => 
					{
						let userInfo = Object.assign(this.$store.getters.userInfo, {
							nick_name: this.nick_name,
							})
						this.$store.dispatch("user/updateUserInfo", userInfo)
						console.log(data.data, this.$store)
						uni.navigateBack()
					}
				})
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
