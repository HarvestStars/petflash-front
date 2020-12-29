<template>
	<view class="background">		
		<view class="wrap">
			<u-row>
				<u-col span="3">
					<view style="width: 100rpx;">
						<u-image width="100%" height="100rpx" shape="circle" :src="avartarURL"></u-image>
					</view>
				</u-col>
				<u-col span="9">
					<u-row>
						<view>
							{{nickName}}
						</view>
					</u-row>
					<view>
						<text>\n</text>
					</view>
					<u-row>
						<view v-if="isVerified">
							<u-tag text="已实名认证" type="success" shape="square" mode="dark" />
						</view>
						<view v-else>
							<u-tag text="未实名认证" type="info" shape="square" color="rgb(117, 117, 117)" mode="light" />
						</view>
						<view v-if="isCertifiedHouse">
							<u-tag text="已营业资质认证" shape="circle" mode="dark" />
						</view>
						<view v-else>
							<u-tag text="未审核营业资质" type="info" shape="square" color="rgb(117, 117, 117)" mode="light" />
						</view>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<view class="my">
			<u-cell-group>
				<u-cell-item icon="map" title="地址" :value="location" :arrow="false"></u-cell-item>
				<u-cell-item icon="star" title="评分" :value="favor" :arrow="false"></u-cell-item>
				<u-cell-item icon="phone" title="联系方式" :value="phone" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {				
				nickName :"",
				favor: "暂无",
				location: "",
				phone: "",
				isVerified: true,
				isCertifiedHouse: false,
				avartarURL: 'https://api.petflash.cn/api/v1/images/system_avatar/logo.png'
				/*avartarURL: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'*/
			}
		},
		
		onLoad: function(option) {
			this.nickName = option.nick_name ? option.nick_name : "用户暂无昵称";
			if (option.favor === "0"){
				this.favor = "暂无";
			}else{
				this.favor = option.favor;
			}
			this.location = option.location;
			this.phone = option.phone;
			
			if (option.is_verified === "true"){
				this.isVerified = true;
			}else{
				this.isVerified = false;
			}
			
			if (option.is_certified_house === "true"){
				this.isCertifiedHouse = true;
			}else{
				this.isCertifiedHouse = false;
			}
		},
		
		methods: {
			
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
