<template>
	<view class="role-select-container">
		<view class="padding" style="height: 100%;">			
			<view class="grid margin-bottom text-center col-3">
				<button class="padding role role-top" style="background-color: #333333"
				@click="handleRoleSelect(roles[0])">
				<view>
					<view>
					<text class="role-text-top">企业版</text>
					</view>
					<view style="line-height: 12rpx;">
					<text class="role-text-content">\n寻找优秀的员工</text>
					</view>
				</view>
				</button>
			</view>
			<view class="grid margin-bottom text-center col-3">
				<button class="padding role role-top" style="color: #333333; background-color: #ffbd59"
				@click="handleRoleSelect(roles[1])">
				<view>
					<view>
					<text class="role-text-top">个人版</text>
					</view>
					<view style="line-height: 12rpx;">
					<text class="role-text-content">\n遇见心仪的工作</text>
					</view>
				</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../api/index.js"
	import logo from "../../asserts/logo.png"
	export default {
		data() {
			return {
				imageURL: logo,
				
			}
		},
		computed: {
			roles() {
				return this.$store.getters.requireRols
			}
		},
		methods: {
			handleRoleSelect: function(role) {
				console.log("handleRoleSelect", role)
				if (this.roles.indexOf(role) === -1) {
					return
				}
				uni.request({
					url: `${api.baseUrl}/api/v1/account/profile`,
					method: "GET",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					data: {
						utype: role
					},
					success: ({data}) => {
						console.log(data.data, this.$store)
						if (data.code === 0) {
							let userInfo = Object.assign(this.$store.getters.userInfo, data.data.user_info)
							//this.$store.dispatch("user/updateUserInfo", userInfo)
							this.$store.dispatch("user/setToken", data.data.token)
							if (role === "PetHouse"){
								let userInfoWithNewType = Object.assign(userInfo, {
									user_type: 1,
								})
								this.$store.dispatch("user/updateUserInfo", userInfoWithNewType)
								console.log("门店信息缓存表",this.$store.getters.userInfo)
								uni.redirectTo({
									url: "../pethouse/home/index"
								})
							}else{
								let userInfoWithNewType = Object.assign(userInfo, {
									user_type: 2,
								})
								this.$store.dispatch("user/updateUserInfo", userInfoWithNewType)
								console.log("美容师信息缓存表",this.$store.getters.userInfo)
								uni.redirectTo({
									url: "../groomer/home/index"
								})
							}
						}
					}
				})
				
			}
		}
	}
</script>

<style>
	.role-select-container {
		height: 100vh;
	}

	.role-top {
		margin-top: 20vh;
	}

	.role {
		font-size: 20px;
		color: #ffbd59;
		text-align: center;
		line-height: 6vh;
		vertical-align: middle;
		height: 15vh;
		width: 30vh;
		border-style: solid;
		border-width: 0px;
	}
	
	.role::after{ 
		border: none;
	}
	
	.role-text-top{
		line-height: 30rpx;
		font-weight: bold;
	}
	.role-text-content{
		font-size: 15px;
		font-weight: normal;
	}
</style>

