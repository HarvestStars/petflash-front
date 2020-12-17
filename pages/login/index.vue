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
				<view class="title">
					<!-- <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 32 32" width="22" height="22" style="fill: rgb(16, 16, 16);">
						<path d="M8 5.333v21.333h16v-21.333h-16zM6.667 2.667h18.667c0.736 0 1.333 0.597 1.333 1.333v0 24c0 0.736-0.597 1.333-1.333 1.333v0h-18.667c-0.736 0-1.333-0.597-1.333-1.333v0-24c0-0.736 0.597-1.333 1.333-1.333v0zM16 22.667c0.736 0 1.333 0.597 1.333 1.333s-0.597 1.333-1.333 1.333v0c-0.736 0-1.333-0.597-1.333-1.333s0.597-1.333 1.333-1.333v0z"></path>
					</svg> -->
					<FontAwesome type="fas fa-mobile-alt" size="40" color="rgb(16, 16, 16)" fw></FontAwesome>
				</view>
				<input placeholder="请输入手机号码" name="input" type="text" maxlength="11" @input="handlePhoneNumberInput" :value="loginForm.phoneNumber"
				 @focus="handleFocus"></input>
				<view class="cu-capsule radius" style="margin-right: 20px;">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>

			<br />

			<view :class="verifyCodeClass">
				<!-- <view :class="verifyCodeClass  style="margin-top: 20px;""> -->
				<view class="title">
					<!-- <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 32 32" width="22" height="22" style="fill: rgb(16, 16, 16);">
						<path d="M16 1.333l10.956 2.435c0.602 0.137 1.044 0.668 1.044 1.301v0 13.316c-0 2.764-1.402 5.201-3.534 6.638l-0.028 0.018-8.437 5.625-8.437-5.625c-2.16-1.455-3.562-3.891-3.563-6.655v-13.317c0-0.634 0.442-1.164 1.035-1.3l0.009-0.002 10.956-2.435zM16 4.065l-9.333 2.073v12.247c0 1.843 0.935 3.467 2.356 4.425l0.019 0.012 6.959 4.64 6.959-4.64c1.44-0.97 2.374-2.594 2.375-4.436v-12.248l-9.333-2.072zM16 9.333c0 0 0.001 0 0.001 0 1.473 0 2.667 1.194 2.667 2.667 0 0.982-0.531 1.84-1.321 2.303l-0.013 0.007-0.001 5.691h-2.667v-5.691c-0.803-0.47-1.333-1.328-1.333-2.309 0-1.473 1.194-2.667 2.667-2.667v0z"></path>
					</svg> -->

					<FontAwesome type="fas fa-user-lock" size="40" color="rgb(16, 16, 16)" fw></FontAwesome>
				</view>
				<input placeholder="请输入验证码" name="input" type="number" maxlength="6" @input="handleVerifyCodeInput" :value="loginForm.verifyCode"
				 @focus="handleFocus"></input>
				<button class='cu-btn bg-green shadow' style="margin-right: 20px; height: 30px;" v-if="!disableSendVerifyCode"
				 @click="handleSendVerifyCode">验证码</button>
				<button class='cu-btn bg-green shadow' style="margin-right: 20px; height: 30px;" v-else disabled>已经发送{{disableSendVerifyInSecs}}重试</button>
			</view>

			<br />
			<view>
				<button type="primary" class="login-btn" @click="handleLogin">登录</button>
			</view>
		</form>
	</view>
</template>

<script>
	import image1 from "../../asserts/v2_q96xt0.jpg"
	import image2 from "../../asserts/v2_q96xua.jpg"
	import image3 from "../../asserts/v2_q96xxz.jpg"

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
					verifyCode: '1234'
				},
				phoneNumberWarning: false,
				verifyCodeWarning: false,
				phoneNumberClass: ['cu-form-group', 'login-input'],
				verifyCodeClass: ['cu-form-group', 'login-input'],
				validateFailedClass: ['input-warning', 'shake'],
				validatePassClass: ['input-success'],
				disableSendVerifyCode: false,
				disableSendVerifyInSecs: 10,
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
							this.loginForm.verifyCode = "1234"
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
							if (this.$store.getters.requireRols.indexOf(userInfo.user_type) > -1) {
								uni.redirectTo({
									url: "../pethouse_home/index"
								})
							} else {
								// todo  区分 pethouse 和 groomer
								uni.redirectTo({
									url: "../pethouse_home/index"
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
		/* padding: 20px; */
		font-size: 14px;
		line-height: 24px;
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
		background-color: rgb(245, 245, 245);
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
		background-color: rgba(16, 16, 16, 0.7);
		border: none;
		color: rgb(255, 255, 255);
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
