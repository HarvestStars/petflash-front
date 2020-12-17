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
				<u-cell-item icon="setting-fill" title="我的钱包" :value="`余额: ${my.wallet}`"></u-cell-item>
				<u-cell-item icon="integral-fill" title="个人信息" value="真实信息认证" @click="verifyClick"></u-cell-item>
				<u-cell-item icon="integral-fill" title="设置" value="账户/通知"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				text: '美容师小明',
				my: {
					wallet: 800.0,
					info: {

					},
					setting: {

					}
				}
			}
		},
		methods: {
			verifyClick() {
				uni.navigateTo({
					url: "../user_info_upload/index"
				})
			},
			userDetail() {
				console.log("userDetail")
				uni.navigateTo({
					url: "../user_detail/index"
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
