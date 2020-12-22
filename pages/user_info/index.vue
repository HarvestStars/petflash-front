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
						<view  @click="userDetail">
							{{text}}
						</view>
					</u-row>
					<u-row>
						<view>
							<u-tag text="未认证" shape="circle" mode="dark" />
						</view>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<view class="my">
			<u-cell-group>
				<view v-if="userType === 1">
				<u-cell-item icon="map-fill" title="门店地址" @click="verifyClick(0)"></u-cell-item>
				</view>
				<u-cell-item icon="account-fill" title="身份认证" value="已认证" @click="verifyClick(1)"></u-cell-item>
				<view v-if="userType === 1">
				<u-cell-item icon="home-fill" title="门店认证" value="未认证" @click="verifyClick(2)"></u-cell-item>
				</view>
				<view v-if="userType === 2">
				<u-cell-item icon="cut" title="资质认证" value="未认证" @click="verifyClick(3)"></u-cell-item>
				</view>
				
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				text: '芭莎宠物会所',
				userType: this.$store.getters.userInfo.user_type,
			}
		},
		methods: {
			verifyClick(e) {
				switch (e) {
					case 0:
						uni.navigateTo({
							url: "../pethouse/location/index" // 门店位置信息
						})
						break
					case 1:
						uni.navigateTo({
							url: "../id_verify/index" // 身份证信息
							
						})
						break
					case 2:
						uni.navigateTo({
							url: "../pethouse/license_verify/index" // 门店环境信息
						})
						break
					case 3:
						uni.navigateTo({
							url: "../certification_verify/index" // 美容师证书信息
						})
						break
				}
			},
			
			userDetail() {
				console.log("userDetail")
				uni.navigateTo({
					
				})
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
