<template>
	<view class="container">
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" style="min-height: 200px;">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<form class="login-form">
			<view :class="phoneNumberClass">
				<view class="cu-capsule" style="padding: 0 30upx;">
					<FontAwesome type="fas fa-mobile-alt" size="40" color="rgb(255, 255, 255)" fw></FontAwesome>
				</view>
				<input style="color:#ffffff" placeholder="请输入手机号码" name="input" type="text" maxlength="11" @input="handlePhoneNumberInput" :value="loginForm.phoneNumber"
				 @focus="handleFocus"></input>
				<view class="cu-capsule radius" style="margin-right: 20px;">
					<view class="cu-tag bg-white" style="background-color: #666666; color: #FFFFFF;">
						+86
					</view>
					<view class="cu-tag line-white" style="background-color: #FFFFFF; color: #666666;">
						中国大陆
					</view>
				</view>
			</view>
			
			<text>\n</text>
				
			<view :class="verifyCodeClass">
				<view class="cu-capsule" style="padding: 0 30upx;">

					<FontAwesome type="fas fa-user-lock" size="40" color="rgb(255, 255, 255)" fw></FontAwesome>
				</view>
				<input style="color:#ffffff" placeholder="请输入验证码" name="input" type="number" maxlength="6" @input="handleVerifyCodeInput" :value="loginForm.verifyCode"
				 @focus="handleFocus"></input>
				<button class='cu-btn shadow' style="background-color: #666666; color: #FFFFFF; margin-right: 20px; height: 30px;" v-if="!disableSendVerifyCode"
				 @click="handleSendVerifyCode">验证码</button>
				<button class='cu-btn shadow' style="margin-right: 20px; height: 30px;" v-else disabled>已经发送{{disableSendVerifyInSecs}}重试</button>
			</view>

			<text>\n</text>
			<text>\n</text>
			<view>
				<button class="login-btn" @click="handleLogin">登录</button>
			</view>
		</form>
	</view>
</template>

<script>	
	import image1 from "../../asserts/logo.png"
	import image2 from "../../asserts/logo.png"
	import image3 from "../../asserts/logo.png"

	import utils from "../../utils/index.js"
	import FontAwesome from '../../components/Am-FontAwesome/index.vue'
	
	import api from "../../api/index.js"

	export default {
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: image1
				}, {
					id: 1,
					type: 'image',
					url: image2,
				}, {
					id: 2,
					type: 'image',
					url: image3
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				loginForm: {
					phoneNumber: '',
					verifyCode: ''
				},
				phoneNumberWarning: false,
				verifyCodeWarning: false,
				phoneNumberClass: ['cu-form-group', 'login-input'],
				verifyCodeClass: ['cu-form-group', 'login-input'],
				validateFailedClass: ['input-warning', 'shake'],
				validatePassClass: ['input-success'],
				disableSendVerifyCode: false,
				disableSendVerifyInSecs: 60,
				verifyCodeTimer: null
			}
		},
		watch: {
			phoneNumberWarning: {
				handler(val) {
					this.validateFailedClass.forEach(cls => {
						if (val) {
							this.phoneNumberClass.push(cls)
						} else {
							utils.removeElement(this.phoneNumberClass, cls)
						}
					})
				}
			},
			verifyCodeWarning: {
				handler(val) {
					this.validateFailedClass.forEach(cls => {
						if (val) {
							this.verifyCodeClass.push(cls)
						} else {
							utils.removeElement(this.verifyCodeClass, cls)
						}
					})
				}
			},
			disableSendVerifyCode: {
				handler(val) {
					if (!val) {
						this.disableSendVerifyInSecs = 60
						if (this.verifyCodeTimer) {
							clearInterval(this.verifyCodeTimer)
						}
					}
				}
			}
		},
		onShow () {
			console.log('login, onShow')
			if (this.$store.getters.hasLogin) {
				
			}
		},
		mounted() {

		},
		components: {
			FontAwesome
		},
		methods: {
			handlePhoneNumberInput: function(e) {
				console.log(this.loginForm, e.detail)
				this.loginForm.phoneNumber = e.detail.value
			},
			handleVerifyCodeInput: function(e) {
				console.log(this.loginForm, e.detail)
				this.loginForm.verifyCode = e.detail.value

			},
			handleFocus: function(e) {
				this.phoneNumberWarning = false
				this.verifyCodeWarning = false
			},
			handleSendVerifyCode: function(e) {
				uni.request({
					url: `${api.baseUrl}/api/v1/account/smscode/${this.loginForm.phoneNumber}`,
					method: "GET",
					success: ({data}) => {
						if (data.code === 0) {
							const smsInfo = data.data
							this.$store.dispatch("user/setSmsCode", smsInfo)
							//this.loginForm.verifyCode = ""
						}
					}
				})
				this.disableSendVerifyCode = true
				this.verifyCodeTimer = setInterval(() => {
					if (this.disableSendVerifyInSecs > 0) {
						this.disableSendVerifyInSecs -= 1
					} else {
						this.disableSendVerifyCode = false
					}
				}, 1 * 1000)
			},
			setPhoneNumberFieldSuccess: function(e) {
				this.phoneNumberWarning = false
				this.phoneNumberClass.push(this.validatePassClass)
			},
			setPhoneNumberFieldWarning: function(e) {
				this.phoneNumberWarning = true
			},
			setVerifyCodeFieldSuccess: function(e) {
				this.verifyCodeWarning = false
				this.verifyCodeClass.push(this.validatePassClass)

			},
			setVerifyCodeFieldWarning: function(e) {
				this.verifyCodeWarning = true

			},
			resetPhoneNumberField: function(e) {
				utils.removeElement(this.phoneNumberClass, this.validatePassClass)
			},
			resetVerifyCodeField: function(e) {
				utils.removeElement(this.verifyCodeClass, this.validatePassClass)
			},
			handleLogin: function(e) {
				console.log("handleLogin", this.loginForm)
				const validatePhoneNumberResult = utils.validatePhoneNumber(this.loginForm.phoneNumber)
				this.resetPhoneNumberField()
				if (validatePhoneNumberResult) {
					this.setPhoneNumberFieldSuccess()
				} else {
					this.setPhoneNumberFieldWarning()
				}
				const validateVerifyCodeResult = utils.validateVerifyCode(this.loginForm.verifyCode)
				this.resetVerifyCodeField()
				if (validateVerifyCodeResult) {
					this.setVerifyCodeFieldSuccess()
				} else {
					this.setVerifyCodeFieldWarning()
				}
				if (validatePhoneNumberResult && validateVerifyCodeResult) {
					//  can login
					uni.request({
						url: `${api.baseUrl}/api/v1/account/smscode/signin_or_signup`,
						method: "POST",
						data: {
								phone: this.loginForm.phoneNumber,
								code: this.loginForm.verifyCode,
								smsid: this.$store.getters.smsInfo.smsid
						},
						success: ({data}) => {
							let userInfo = Object.assign({}, data.data.user, data.data.user_info)
							this.$store.dispatch("user/setUserInfo", userInfo)
							this.$store.dispatch("user/setToken", data.data.token)
							if (data.data.user.user_type === 0) {
								uni.redirectTo({
									url: "../role_select/index"
								})
							}
							if (data.data.user.user_type === 1) {
								uni.redirectTo({
									url: "../pethouse/home/index"
								})
							}
							if (data.data.user.user_type === 2) {
								uni.redirectTo({
									url: "../groomer/home/index"
								})
							}
						},
						fail: (error) => {
							console.log(error)
						}
					})
					this.resetPhoneNumberField()
					this.resetVerifyCodeField()
				}
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		width: 38px;
		height: 38px;
		min-width: 38px;
		min-height: 38px;
		position: relative;
		display: block;
		box-sizing: border-box;
		margin-left: 15px;
	}

	.container {
		/*padding: 20px;*/
		position: fixed;

		height: 100%;
		width: 100%;
		
		font-size: 14px;
		line-height: 24px;
		background-color: rgba(0, 0, 0, 1.0);
	}

	.login-form {
		margin-top: 5vh;
		display: block;
		padding: 20px;
	}

	.login-input,
	.input-warning,
	.input-success {
		height: 55px;
		background-color: rgb(51, 51, 51);
		border: none;
		color: rgb(255, 255, 255);
		border-radius: 50px;
		font-size: 16px;
		padding: 0px;
		text-align: left;
		line-height: 23px;
		font-weight: normal;
		font-style: normal;
		opacity: 1;
	}

	.input-warning {
		border-style: solid;
		border-width: 1px;
		border-color: red;
	}

	.input-success {
		border-style: solid;
		border-width: 1px;
		border-color: green;
	}

	.title>.svg-icon {
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	.login-btn {
		height: 55px;
		line-height: 55px;
		vertical-align: middle;
		background-color: rgba(255, 189, 89, 1.0);
		border: none;
		color: rgb(0, 0, 0);
		border-radius: 50px;
		font-size: 16px;
		padding: 0px;
		text-align: center;
		font-weight: normal;
		font-style: normal;
		animation-iteration-count: 1;
		animation-duration: 1s;
		opacity: 1;
	}

	.shake {
		animation: shake 800ms ease-in-out;
	}

	@keyframes shake {

		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(+2px, 0, 0);
		}

		30%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(+4px, 0, 0);
		}

		50% {
			transform: translate3d(-4px, 0, 0);
		}
	}
</style>
