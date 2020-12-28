<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs>
			</view>
			<view>
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box" v-if="current === 0">
						<view v-if="orderList[0].length > 0">
							<view class="order" v-for="res in orderList[0]" :key="res.id">
								<u-row>
									<u-col span="8">
										<view class="item" v-for="(item, index) in res.goodsList" :key="index">
											<view class="content">
												<u-button slot="center" :type="'warning'" size="mini">{{ item.title }}</u-button>
												<view><text>\n</text></view>
												
												<view class="start-time"> 
												<u-button shape="circle" slot="center" :type="'success'" size="mini">开始时间</u-button>
												<text>\t</text>
												{{ item.startTime }}
												</view>
												
												<view class="finish-time"> 
												<u-button shape="circle" slot="center" :type="'error'" size="mini">结束时间</u-button>
												<text>\t</text>
												{{ item.deliveryTime }}
												</view>
											</view>
										</view>
									</u-col>
									
									<u-col span="4">
										<view class="total">
											<text>
												<text v-if="res.goodsList[0].basic > 0">
												\t底薪:\t
												<text class="total-price" space="ensp">
												{{ res.goodsList[0].basic }}
												</text>
												元
												</text>
												\n
												<text v-if="res.goodsList[0].commission > 0">
												\t提成:\t
												<text class="total-price">
													{{ res.goodsList[0].commission }}
												</text>
												%
												</text>
											</text>
										</view>
									</u-col>
								</u-row>
								<view class="bottom">
									<view class="more">
									</view>
									<view class="evaluate btn" @click="CancelNewOrder(res.id)">取消订单</view>
								</view>
							</view>
							<u-loadmore v-show="pageInfo.page < pageInfo.total_pages" :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view v-else>
							<view class="page-box">
								<view>
									<view class="centre">
										<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
										<view class="explain">
											您还没有相关的订单
											<view class="tips">马上去招募美容师</view>
										</view>
										<view class="btn" @click="releaseOrder">去下单</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="page-box" v-if="current === 1">
						<view v-if="orderList[1].length > 0">
							<view class="order" v-for="res in orderList[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-button :type="'warning'" size="mini">{{ res.goodsList[0].title }}</u-button>
									</view>
									<view class="right"
									@click="GetGroomerAbstract(res.goodsList[0].groomer.nickName, res.goodsList[0].groomer.avartarURL, res.goodsList[0].groomer.favor, res.goodsList[0].groomer.isVerified, res.goodsList[0].groomer.isCertifiedGroomer, res.goodsList[0].groomer.phone, res.goodsList[0].groomer.qualification)"> 
									<u-icon name="cut"></u-icon>
									人员简介
									</view>
								</view>
								
								<u-row>
									<u-col span="8">
										<view class="item" v-for="(item, index) in res.goodsList" :key="index">
											<view class="content">
												<view><text>\n</text></view>
												
												<view class="start-time"> 
												<u-button shape="circle" slot="center" :type="'success'" size="mini">开始时间</u-button>
												<text>\t</text>
												{{ item.startTime }}
												</view>
												
												<view class="finish-time"> 
												<u-button shape="circle" slot="center" :type="'error'" size="mini">结束时间</u-button>
												<text>\t</text>
												{{ item.deliveryTime }}
												</view>
												<view><text>\n</text></view>
												
												<view class="finish-time">
												<u-button shape="square" slot="center" :type="'primary'" size="mini">接单时间</u-button>
												<text>\t</text>
												{{ item.matchTime }}
												<view>
													<text style="font-size: 22rpx; color: #C0C0C0;">\t接单10分钟内可以无责任取消</text>
												</view>
												</view>													
											</view>
										</view>
									</u-col>
									
									<u-col span="4">
										<view class="total">
											<text>
												<text v-if="res.goodsList[0].basic > 0">
												\t底薪:\t
												<text class="total-price" space="ensp">
												{{ res.goodsList[0].basic }}
												</text>
												元
												</text>
												\n
												<text v-if="res.goodsList[0].commission > 0">
												\t提成:\t
												<text class="total-price">
													{{ res.goodsList[0].commission }}
												</text>
												%
												</text>
											</text>
										</view>
									</u-col>
								</u-row>
								<view class="bottom">
									<view class="exchange btn" @click="DenyAction(res.id, res.goodsList[0].matchTime)">取消该人员</view>
									<view class="exchange btn" @click="CancelRunningOrder(res.id, res.goodsList[0].matchTime)">取消订单</view>
									<view class="evaluate btn" @click="confirmOrder(res.id)">确认完成</view>
								</view>
							</view>
							<u-loadmore v-show="pageInfo.page < pageInfo.total_pages" :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view v-else>
							<view class="page-box">
								<view>
									<view class="centre">
										<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
										<view class="explain">
											您还没有相关的订单
											<view class="tips">马上去招募美容师</view>
										</view>
										<view class="btn" @click="releaseOrder">去下单</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="page-box" v-if="current === 2">
						<view v-if="orderList[2].length > 0">
							<view class="order" v-for="res in orderList[2]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-button :type="'warning'" size="mini">{{ res.goodsList[0].title }}</u-button>
									</view>
									<view class="right"
									@click="GetGroomerAbstract(res.goodsList[0].groomer.nickName, res.goodsList[0].groomer.avartarURL, res.goodsList[0].groomer.favor, res.goodsList[0].groomer.isVerified, res.goodsList[0].groomer.isCertifiedGroomer, res.goodsList[0].groomer.phone, res.goodsList[0].groomer.qualification)"> 
									<u-icon name="cut"></u-icon>
									人员简介
									</view>
								</view>
								
								<u-row>
									<u-col span="8">
										<view class="item" v-for="(item, index) in res.goodsList" :key="index">
											<view class="content">
												<view><text>\n</text></view>
												
												<view class="start-time"> 
												<u-button shape="circle" slot="center" :type="'success'" size="mini">开始时间</u-button>
												<text>\t</text>
												{{ item.startTime }}
												</view>
												
												<view class="finish-time"> 
												<u-button shape="circle" slot="center" :type="'error'" size="mini">结束时间</u-button>
												<text>\t</text>
												{{ item.deliveryTime }}
												</view>										
											</view>
										</view>
									</u-col>
									
									<u-col span="4">
										<view class="total" style="margin-top: 60rpx;">
											合计:
											<text class="total-price">
												￥{{ res.goodsList[0].totalPay }}
											</text>
										</view>
									</u-col>
								</u-row>
								
								<view class="bottom">
									<view class="more">
									</view>
									<view v-if="res.goodsList[0].isComment === false">
									<view class="evaluate btn" @click="sendComment(res.id)">写评论</view>
									</view>
									<view v-else>
									<view class="exchange btn">已评论</view>
									</view>
								</view>
							</view>
							<u-loadmore v-show="pageInfo.page < pageInfo.total_pages" :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view v-else>
								<view class="page-box">
									<view>
										<view class="centre">
											<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
											<view class="explain">
												您还没有相关的订单
												<view class="tips">马上去招募美容师</view>
											</view>
											<view class="btn" @click="releaseOrder">去下单</view>
										</view>
									</view>
								</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	import order from "../../../utils/order.js"
	import moment from "moment"
	export default {
		data() {
			return {
				orderList: [
					[],
					[],
					[]
				],
			
				list: [{
						name: '正在招募'
					},
					{
						name: '正在进行'
					},
					{
						name: '已经完成'
					}
				],
				current: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore'],
				pageInfo: {
					page: 1,
					pageSize: 10,
					total_pages: 0
				},
			};
		},
		
		onLoad: function(option) {
			this.current = parseInt(option.current);
			//this.getOrderList(this.current);		
		},
		
		// 在当前page中等待页面数据的变化, 等待回调然后刷新页面数据
		onShow: function(){
			console.log("onShow: running order list length");
			this.getOrderList(this.current);			
		},
		
		methods: {
			reachBottom() {
				console.log("reachBottom", this.pageInfo)
				this.loadStatus.splice(this.current, 1, "loading")
				if (this.pageInfo.page < this.pageInfo.total_pages) {
					this.pageInfo.page += 1
					this.getOrderList(this.current);
				}
			},
			
			serviceIdToStr(serviceIds) {
				let strs = []
				try{
					serviceIds.forEach(id => {
						strs.push(order.orderServices[id])
					})
				}catch(e){
					// 说明service items 为空，为普通订单
					strs.push(order.orderServices[0])
				}
				return strs.join("、")
			},
			
			generateQueryParam(status) {
				let s = []
				status.forEach(st => {
					s.push(`order_status=${st}`)
				})
				return s.join("&")
			},
			
			// 发布订单
			releaseOrder() {
				uni.redirectTo({
					url: "../release_orders/index"
				})
			},
			
			// 页面数据
			getOrderList(idx) {
				console.log("getOrderList 触发页面数据获取",idx)
				const idx2Status = {
					0: [2, 3, 4],
					1: [5],
					2: [6],
				}

				uni.request({
					url: `${api.baseUrl}/api/v1/order/pethouse/list?page_size=${this.pageInfo.pageSize}&page_index=${this.pageInfo.page}&${this.generateQueryParam(idx2Status[idx])}`,
					method: "GET",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: ({
						data
					}) => {
						console.log("getOrderList 历史数据页面的request数据回调开始")
						console.log("getOrderList orderList重置为空")
						this.orderList[idx] = [];
						const lists = data.data.lists === null ? [] : data.data.lists;
						lists.forEach(list => {
							const lst = {
								id: list.id,
								deal: order.orderStatus[list.status],
								goodsList: [{
									goodsUrl: '//127.0.0.1:8080/api/v1/images/imagetest',
									title: this.serviceIdToStr(list.service_items),
									status: order.orderStatus[list.status],
									startTime: moment(new Date(list.started_at)).format('YYYY-MM-DD HH:mm'),
									deliveryTime: moment(new Date(list.finished_at)).format('YYYY-MM-DD HH:mm'),
									matchTime: moment(new Date(list.children.match_order.created_at)).format('YYYY-MM-DD HH:mm'),
									basic: list.payment.detail.basic,
									commission: list.payment.detail.commission,
									totalPay: list.payment.detail.total_pay,
									isComment: list.is_comment_to,
									groomer: {
										accountID: list.children.groomer.account_id,
										avatarUrl: list.children.groomer.avatar,
										nickName: list.children.groomer.nick_name,
										favor: list.children.groomer.favor,
										status: list.children.groomer.status,
										name: list.children.groomer.name,
										phone: list.children.groomer.phone,
										isVerified: list.children.groomer.is_verified,
										isCertifiedGroomer: list.children.groomer.is_certified_groomer,
										qualification: list.children.groomer.qualification,
									},
									matchID: list.children.match_order.id
								}]
							}
							this.orderList[idx].push(lst);
							/*
							let itemIdx = this.orderList[idx].findIndex(item => {
								if (item.id === lst.id){
									return true;
								}
							})
							if (itemIdx === -1){
								console.log("getOrderList 数据获取后放入list",lst.id)
								this.orderList[idx].push(lst)
								console.log("数据获取后, list长度",this.orderList[idx].length)
							}else{
								console.log("getOrderList 数据重复丢弃, id号",lst.id)
							}
							*/
						})
						this.pageInfo.total_pages = data.data.pagination.total_pages
					}
				})
				console.log("list长度",this.orderList[idx].length)
				this.loadStatus.splice(this.current,1,"loadmore")
			},

			// 取消未接单订单
			CancelNewOrder(id) {	
				uni.showModal({
					title: '提示',
					content: '你确定要取消这个订单吗?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							this.CancelOrder(id, 0)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)	
				})
			},
			
			// 取消正在进行的订单
			CancelRunningOrder(id, matchTime) {		
				var now = moment().valueOf()
				console.log(now)
				console.log(moment(matchTime).valueOf())
				// 超时取消
				if ((moment(matchTime).valueOf() + 600000) < now){
					console.log("已超出可取消时间")
					uni.showModal({
						title: '注意',
						content: '已超出可取消时间, 强制取消可能会影响您今后的信用, 确定要取消吗?',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								this.CancelOrder(id, 1)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}.bind(this)
					})
					return
				}
				
				// 正常取消
				uni.showModal({
					title: '提示',
					content: '你确定要取消这个订单吗?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							this.CancelOrder(id, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)	
				})
			},
			
			CancelOrder(id, statusBar){
				uni.request({
					url: `${api.baseUrl}/api/v1/order/pethouse/cancel/${id}`,
					method: "DELETE",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: () => {
						uni.redirectTo({
							url: `../order_history/index?current=${statusBar}`
						})
					}
				})
			},
			
			// 取消美容师
			DenyAction(id, matchTime){
				var now = moment().valueOf()
				console.log(now)
				console.log(moment(matchTime).valueOf())
				// 超时取消
				if ((moment(matchTime).valueOf() + 600000) < now){
					uni.showModal({
						title: '注意',
						content: '已超出可取消人员的时间, 请直接点击"取消订单"',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}.bind(this)
					})
					return
				}
				
				// 正常取消
				uni.showModal({
					title: '提示',
					content: '你确定要拒绝这位员工吗?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							this.DenyGroomer(id, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)	
				})
			},
			
			DenyGroomer(id, statusBar){
				uni.request({
					url: `${api.baseUrl}/api/v1/order/pethouse/deny/${id}`,
					method: "DELETE",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: () => {
						uni.redirectTo({
							url: `../order_history/index?current=${statusBar}`
						})
					},
					fail: (err) => {
						uni.redirectTo({
							url: `../order_history/index?current=${statusBar}`
						})
					}
				})
			},
			
			// 美容师简报
			GetGroomerAbstract(nickName, avartarURL, favor, isVerified, isCertified, phone, qualification) {
				uni.navigateTo({
					url: `../../groomer/abstract/index?nick_name=${nickName}&avartar=${avartarURL}&favor=${favor}&is_verified=${isVerified}&is_certified=${isCertified}&phone=${phone}&qualification=${qualification}`
				})
			},
			
			// 订单确认
			confirmOrder(idx) {
				uni.navigateTo({
					url: `../finish_order/index?order_id=${idx}`
				})
			},
			
			// 写评论
			sendComment(idx) {
				uni.navigateTo({
					url: `../../common/comment/index?order_id=${idx}&comment_type=ToGroomerOrder`
				})
			},
			
			setOrderList(orderIdx, list){
				this.orderList[orderIdx] = list;
			},
			
			cleanOrderList(orderIdx){
				this.orderList[orderIdx] = [];
			},
			
			removeOrderListEle(orderIdx, id){
				var idx = this.orderList[orderIdx].findIndex(item => {
					if (item.id == id){
						return true;
					}
				});
				if　(idx === -1){
					console.log("目标元素不存在");
				}else{
					console.log("待删除组", this.orderList[orderIdx]);
					this.orderList[orderIdx].splice(idx, 1);
					console.log("删除后", this.orderList[orderIdx]);
				}
			},
			
			orderBeCommented(id){
				var idx = this.orderList[2].findIndex(item => {
					if (item.id == id){
						return true;
					}
				});
				if　(idx === -1){
					console.log("目标元素不存在");
				}else{
					this.orderList[2][idx].goodsList[0].isComment = true;
					console.log("标记完成");
				}
			},
			
			// tab栏切换
			change(index) {
				console.log("触发change",index)
				this.current = index;
				this.pageInfo.page = 1;
				this.pageInfo.total_pages = 0;
				this.getOrderList(index);
			},
			
			isCommentIndex(orderListInx, orderID){
				var orderInx = this.orderList[orderListInx].findIndex((element) => element.id === orderID);
				this.orderList[orderListInx][orderInx].isComment = true;
				console.log("订单号为", orderID, "在orderlist中的序号为", orderInx);
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			justify-content: space-between;
			/*margin: 10rpx 0 0;*/

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.start-time {
					color: #c0c0c0;
					font-size: 24rpx;
				}
				
				.finish-time {
					color: #292421;
					font-size: 24rpx;
				}
				
				.match-time {
					color: #292421;
					font-size: 24rpx;
				}
				
				.worker-info {
					color: rgb(255, 173, 32);
					font-size: 35rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 100rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 30rpx;
				color: #ff9912;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 210rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	
	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
