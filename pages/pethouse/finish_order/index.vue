<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm" label-width="180">
			<u-form-item label="总价" style="font-size: 35rpx;">
				<u-input placeholder="(元)" input-align="right" v-model="form.totalPrice" />
			</u-form-item>
			<view>
			<text>\n</text>
			</view>
			<view v-if="form.totalPrice === null">
				<u-button shape="margin-top" type="default" style="color: #C0C0C0;">填入金额后即可确认</u-button>
			</view>
			<view v-else>
				<u-button class="margin-top" type="warning" @click="confirmSync">确认完成</u-button>
			</view>
		</u-form>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	import order from "../../../utils/order.js"
	import moment from "moment"
	export default {
		data() {
			return {
				orderID: 0,
				form: {
					totalPrice: null,
				},
			};
		},
		onLoad: function(option){
			this.orderID = option.order_id;
		},
		methods: {
			confirmSync(){
				var order_id = this.orderID
				var totalPrice = this.form.totalPrice
				var tokenType = this.$store.getters.token.token_type
				var access_token = this.$store.getters.token.access_token
				var pages = getCurrentPages()
				var prevPage = pages[pages.length - 2]
				var orderList = []
				const idx2Status = {
					0: [2, 3, 4],
					1: [5],
					2: [6],
				}
				const requestPromise = new Promise(function(resolve, reject){
					console.log("confirmSync 确认订单序号",order_id)
					if (order_id === 0){
						reject(new Error());
					}
					uni.request({
						url: `${api.baseUrl}/api/v1/order/pethouse/close/${order_id}?total_payment=${totalPrice}`,
						method: "GET",
						header: {
							"content-type": "application/json",
							Authorization: `${tokenType} ${access_token}`
						},
						success: () => {
							resolve();
						}
					})
				})
				
				requestPromise.then(function(value){
					return new Promise(function(resolve,reject){
						console.log("confirmSync 第一次then结束")
						prevPage.$vm.removeOrderListEle(1, order_id);
						resolve();
					})
				}).then(function(value){
					console.log("confirmSync 第2次then开始")
					uni.navigateBack();
					console.log("confirmSync 第2次then结束")
				});
			},
			
			confirm() {
				console.log("confirmSync 确认订单序号",this.orderID)
				if (this.orderID === null){
					return
				}
				
				uni.request({
					url: `${api.baseUrl}/api/v1/order/pethouse/close/${this.orderID}?total_payment=${this.form.totalPrice}`,
					method: "GET",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: () => {
						uni.redirectTo({
							url: `../pethouse/order_history/index?current=2`
						})
					}
				})
			},
			
			cancel(){
				// 返回上一页
				uni.redirectTo({
					url: `../pethouse/order_history/index?current=1`
				})
			}
		}
	};
</script>

<style>
	.wrap {
		padding: 30rpx;
		background-color: #FFFFFF;
	}
</style>
