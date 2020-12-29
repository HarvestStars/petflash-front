<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm" label-width="180">
			<u-form-item label="满意度">
				<view class="item-right"></view>
				<u-rate :count="maxStars" v-model="favor" active-icon="heart-fill" inactive-icon="heart"></u-rate>
			</u-form-item>
			<u-form-item :label="objLabel">
				<u-input placeholder="今后会以匿名的形式显示在Ta的主页" v-model="form.content" input-align="left" />
			</u-form-item>
			
			<text>\n</text>
			<view v-if="form.content === null">
				<u-button shape="square" style="color: #C0C0C0;">请填写评论后发送</u-button>
			</view>
			<view v-else>
				<u-button shape="square" type="warning" @click="confirm">发送评论</u-button>
			</view>
		</u-form>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	export default {
		data() {
			return {
				objLabel: "",
				orderID: 0,
				maxStars: 5,
				favor:5,
				commentType:"",
				form: {
					content: null,
				},
			};
		},
		onLoad: function(option){
			this.orderID = parseInt(option.order_id);
			this.commentType = option.comment_type;
			if (this.commentType === "ToPetHouseOrder"){
				this.objLabel = "对Ta的评价"
			}else{
				this.objLabel = "对Ta的评价"
			}
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
							favor: this.favor
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
	.wrap {
		padding: 30rpx;
		background-color: #FFFFFF;
	}
	
	.item-right {
		padding: 0 150rpx;
	}
</style>
