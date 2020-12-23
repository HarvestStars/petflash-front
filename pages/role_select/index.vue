<template>
	<view class="role-select-container">
		<view class="padding" style="height: 100%;">
			<view class="grid margin-bottom text-center col-3">
				<button class="padding role role-top" @click="handleRoleSelect(roles[0])">我要招人</button>
			</view>
			<view class="grid margin-bottom text-center col-3">
				<button class="padding role role-top" @click="handleRoleSelect(roles[1])">我要找工作</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../api/index.js"
	export default {
		data() {
			return {}
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
							this.$store.dispatch("user/setToken", data.data.token)
							this.$store.dispatch("user/updateUserInfo", data.data.user)
							if (role === "PetHouse"){
								uni.redirectTo({
									url: "../pethouse/home/index"
								})
							}else{
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
		text-align: center;
		line-height: 6vh;
		vertical-align: middle;
		height: 10vh;
		border-style: solid;
		border-width: 1px;
	}
</style>
