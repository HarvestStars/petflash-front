<template>
	<u-form :model="form" ref="uForm">
		<u-form-item label="总价"><u-input placeholder="单位(元)" v-model="form.totalPrice" /></u-form-item>
		<view v-if="form.totalPrice === null">
			<u-button shape="circle">确认完成</u-button>
			<u-button shape="circle" @click="cancel">返回</u-button>
		</view>
		<view v-else>
			<u-button shape="circle" type="warning" @click="confirm">确认完成</u-button>
			<u-button shape="circle" @click="cancel">返回</u-button>
		</view>
	</u-form>
</template>

<script>
	import api from "../../api/index.js"
	export default {
		data() {
			return {
				orderID: null,
				form: {
					totalPrice: null,
				},
			};
		},
		onLoad: function(option){
			this.orderID = option.order_id;
		},
		methods: {
			confirm() {
				console.log("确认订单序号",this.orderID)
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
							url: `../pethouse_order_history/index?current=2`
						})
					}
				})
			},
			
			cancel(){
				// 返回上一页
				uni.redirectTo({
					url: `../pethouse_order_history/index?current=1`
				})
			}
		}
	};
</script>

<style>

</style>