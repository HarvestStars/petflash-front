<template>
	<view>
		<view class="release-order-conntainer">
			<button class="release-order-btn" type="default" style="background-color: #ffbd59;" @click="handleReceive">我要接单</button>
		</view>
		<view class="cu-bar tabbar bg-black shadow foot">
			<view class="action" @click="handleNavClick(1)">
				<view>
					<FontAwesome type="fas fa-receipt" size="40" fw :class="'text-gray'"></FontAwesome>
				</view>
				<view class="bar-icon" :class="'text-gray'">订单</view>
			</view>
			<view class="action" @click="handleNavClick(2)">
				<view>
					<FontAwesome type="fas fa-user-circle" size="40" fw :class="'text-gray'"></FontAwesome>
				</view>
				<view class="bar-icon" :class="'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import FontAwesome from "../../../components/Am-FontAwesome/index.vue"
	import Home from "./home.vue"
	export default {
		data() {
			return {
				activeItem: 0
			}
		},
		computed: {
			userInfo: function() {
				return this.$store.getters.userInfo
			}
		},
		components: {
			FontAwesome,
			Home
		},
		created() {

		},
		methods: {
			handleNavClick: function(command) {
				switch (command) {
					case 0:
						uni.navigateTo({
							url: "../home/index"
						})
						break
					case 1:
						uni.navigateTo({
							url: "../order_history/index?current=0"
						})
						break
					case 2:
						uni.navigateTo({
							url: "../../common/user_info/index"
						})
						break
				}
				this.activeItem = command
			},
			handleReceive: function(e) {
				uni.navigateTo({
					url: "../order_history/index?current=0",
					success: () => {
						console.log("jump order release success")
					},
					fail: (err) => {
						console.log("jump order release fail", err)
					}
				})
			}
		}
	}
</script>

<style>
	.map-container {
		height: calc(100vh - 48px);
	}

	.uni-map,
	.release-order-conntainer {
		height: calc(100vh - 48px);
		width: 100vw;
	}

	.bar-icon {
		margin-top: 5px;
	}

	.release-order-btn {
		margin-top: 30vh;
		height: 12vh;
		width: 50vw;
		line-height: 12vh;
		font-size: 30px;
		text-align: center;
	}
</style>
