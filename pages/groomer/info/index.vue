<template>
	<view style="padding: 24rpx;">
		</u-field>
		<u-field v-model="nick_name" label="用户昵称" placeholder="请输入">
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
				
				nick_name: `${this.$store.getters.userInfo.nick_name}`,
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

</style>
