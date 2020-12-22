<template>
	<view class="background">		
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="3">
					<view style="width: 100rpx;">
						<u-image width="100%" height="100rpx" shape="circle" :src="avartarURL"></u-image>
					</view>
				</u-col>
				<u-col span="8">
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
							<u-tag text="已实名认证" shape="circle" mode="dark" />
						</view>
						<view v-else>
							<u-tag text="未实名认证" color="rgb(117, 117, 117)" shape="circle" mode="plain" />
						</view>
						<view v-if="isCertified">
							<u-tag text="已资质认证" shape="circle" mode="dark" />
						</view>
						<view v-else>
							<u-tag text="未审核资质" color="rgb(117, 117, 117)" shape="circle" mode="plain" />
						</view>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<view class="my">
			<u-cell-group>
				<u-cell-item icon="integral" title="资质等级" :value="qualification" :arrow="false"></u-cell-item>
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
				avartarURL: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				isVerified: true,
				isCertified: false,
				qualification: "未知",
				phone: ""
			}
		},
		
		onLoad: function(option) {
			this.nickName = option.nick_name;
			if (option.favor === "0"){
				this.favor = "暂无";
			}else{
				this.favor = option.favor;
			}
		
			this.avartarURL = option.avartar;
			this.phone = option.phone;
			
			if (option.is_verified === "true"){
				this.isVerified = true;
			}else{
				this.isVerified = false;
			}
			
			if (option.is_certified === "true"){
				this.isCertified = true;
			}else{
				this.isCertified = false;
			}
			
			switch (option.qualification) {
			  case "0":
			    this.qualification = '用户未填写'; 
			  	break
			  case "1":
			    this.qualification = '助理级'; 
				break
			  case "2":
			    this.qualification = 'C级'; 
			    break
			  case "3":
			    this.qualification = 'B级'; 
			    break
			  case "4":
			    this.qualification = 'A级'; 
			    break
			  default :
			    this.qualification = '未知'; 
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
