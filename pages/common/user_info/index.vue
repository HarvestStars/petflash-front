<template>
	<view class="background">
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="3">
					<view style="width: 100rpx;">
						<u-image width="100%" height="100rpx" shape="circle" :src="src"></u-image>
					</view>
				</u-col>
				<u-col span="8">
					<u-row>
						<view>
							{{ nick_name }}
						</view>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<view class="my">
			<u-cell-group>
				<view v-if="userType === 1">
				<u-cell-item icon="map" title="门店信息" @click="verifyClick(0)"></u-cell-item>
				</view>
				<view v-if="userType === 2">
				<u-cell-item icon="account" title="昵称" @click="verifyClick(1)"></u-cell-item>
				</view>
				<view v-if="userType === 1">
				<u-cell-item icon="fingerprint" title="店主身份认证" :value="pethouse.owner" @click="verifyClick(2)"></u-cell-item>
				</view>
				<view v-if="userType === 2">
				<u-cell-item icon="fingerprint" title="身份认证" :value="groomer.groomer" @click="verifyClick(2)"></u-cell-item>
				</view>
				<view v-if="userType === 1">
				<u-cell-item icon="home" title="门店认证" :value="pethouse.houseV" @click="verifyClick(3)"></u-cell-item>
				</view>
				<view v-if="userType === 2">
				<u-cell-item icon="cut" title="资质认证" :value="groomer.groomerV" @click="verifyClick(4)"></u-cell-item>
				</view>
				
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nick_name: this.$store.getters.userInfo.nick_name,
				pethouse:{
					owner: this.is_verified ? "已认证" : "未认证",
					houseV: this.is_certified_house ? "已认证" : "未认证"
				},
				
				groomer:{
					groomer: this.is_verified ? "已认证" : "未认证",
					groomerV: this.IsCertifiedGroomer ? "已认证" : "未认证"
				},
				
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				userType: this.$store.getters.userInfo.user_type,
			}
		},
		onShow: function(){
			this.nick_name = this.$store.getters.userInfo.nick_name
		},
		methods: {
			verifyClick(e) {
				switch (e) {
					case 0:
						uni.navigateTo({
							url: "../../pethouse/location/index" // 门店位置信息
						})
						break
					case 1:
						uni.navigateTo({
							url: "../../groomer/info/index" // 美容师个人信息
						})
						break
					case 2:
						uni.navigateTo({
							url: "../id_verify/index" // 身份证信息
							
						})
						break
					case 3:
						uni.navigateTo({
							url: "../../pethouse/license_verify/index" // 门店环境信息
						})
						break
					case 4:
						uni.navigateTo({
							url: "../../groomer/certification_verify/index" // 美容师证书信息
						})
						break
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.background {
		background-color: rgb(248, 248, 248);

		.wrap {
			padding: 80rpx 20rpx 80rpx 80rpx;
			background-color: rgb(255, 255, 255);
		}

		.u-row {
			margin: 40rpx 0;
		}

		.my {
			padding-left: 20rpx;
			margin-top: 20rpx;
			background-color: rgb(255, 255, 255);
		}
	}
</style>
