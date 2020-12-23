<template>
	<u-form :model="form" ref="uForm">
		<u-form-item label="对该员工的评价"><u-input placeholder="评价今后会以匿名的形式显示在ta的主页" v-model="form.content" /></u-form-item>
		<view v-if="form.content === null">
			<u-button shape="circle">发送评论</u-button>
			<u-button shape="circle" @click="cancel">返回</u-button>
		</view>
		<view v-else>
			<u-button shape="circle" type="warning" @click="confirm">发送评论</u-button>
			<u-button shape="circle" @click="cancel">返回</u-button>
		</view>
	</u-form>
</template>

<script>
	import api from "../../../api/index.js"
	export default {
		data() {
			return {
				orderID: 0,
				commentType:"",
				form: {
					content: null,
				},
			};
		},
		onLoad: function(option){
			this.orderID = parseInt(option.order_id);
			this.commentType = option.comment_type;
		},
		methods: {			
			confirm() {
				console.log("确认评论订单号",this.orderID)
				if (this.orderID === 0){
					return
				}

				uni.request({
					url: `${api.baseUrl}/api/v1/comment/create?comment_type=${this.commentType}`,
					method: "POST",	
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					data: {
							order_id: this.orderID,
							content: this.form.content,
							favor: 5
					},

					success: () => {
						var pages = getCurrentPages();
						var prevPage = pages[pages.length-2];
						prevPage.$vm.orderBeCommented(this.orderID);
						uni.navigateBack();
					}
				})
			}
		}
	};
</script>

<style>

</style>