<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[0].length > 0">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="delivery-time"> 时段: {{ item.deliveryTime }} ~ {{ item.deliveryTime }}</view>
									</view>
								</view>
								<view class="total">
									<text>
										<text v-if="res.goodsList[0].basic > 0">
										底薪:\t
										<text class="total-price" space="ensp">
										￥{{ res.goodsList[0].basic }}
										</text>
										</text>
										<text v-if="res.goodsList[0].commission > 0">
										\t提成:\t
										<text class="total-price">
											{{ res.goodsList[0].commission }}%
										</text>
										</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<!--
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
										-->
									</view>
									<view class="evaluate btn" @click="CancelNewOrder(res.id)">取消订单</view>
								</view>
							</view>
							<u-loadmore v-show="pageInfo.page < pageInfo.total_pages" :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view v-else>
							<scroll-view scroll-y style="height: 100%;width: 100%;">
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
							</scroll-view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[1].length > 0">
							<view class="order" v-for="(res, index) in  orderList[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="item in res.goodsList">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="delivery-time">{{ item.deliveryTime }} ~ {{ item.deliveryTime }}</view>
										<text>\n</text>
										<view class="left">
											<u-icon name="account-fill" :size="40" color="rgb(255, 173, 32)" 
											@click="GetGroomerAbstract(item.groomer.nickName, item.groomer.avartarURL, item.groomer.favor, item.groomer.isVerified, item.groomer.isCertifiedGroomer, item.groomer.phone, item.groomer.qualification)">
											</u-icon>
											
											<text class="worker-info" 
											@click="GetGroomerAbstract(item.groomer.nickName, item.groomer.avartarURL, item.groomer.favor, item.groomer.isVerified, item.groomer.isCertifiedGroomer, item.groomer.phone, item.groomer.qualification)">
											\t点击查看人员详情</text>
										</view>
										<view class="delivery-time">接单时间 {{ item.matchTime }}</view>
										<text class="delivery-time">接单10分钟内可免责取消</text>
									</view>
								</view>
								<view class="total">
									<text>
										<text v-if="res.goodsList[0].basic > 0">
										底薪:\t
										<text class="total-price" space="ensp">
										￥{{ res.goodsList[0].basic }}
										</text>
										</text>
										<text v-if="res.goodsList[0].commission > 0">
										\t提成:\t
										<text class="total-price">
											{{ res.goodsList[0].commission }}%
										</text>
										</text>
									</text>
								</view>
								<view class="bottom">
									<view class="exchange btn" @click="DenyAction(res.id, res.goodsList[0].matchTime)">取消该人员</view>
									<view class="exchange btn" @click="CancelRunningOrder(res.id, res.goodsList[0].matchTime)">取消订单</view>
									<view class="evaluate btn">确认完成</view>
								</view>
							</view>
							<u-loadmore v-show="pageInfo.page < pageInfo.total_pages" :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view v-else>
							<scroll-view scroll-y style="height: 100%;width: 100%;">
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
							</scroll-view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box" v-if="orderList[2].length > 0">
							<view class="order" v-for="(res, index) in orderList[2]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="type"> 美容师 {{ item.groomerCount }}/1</view>
										<view class="delivery-time"> 预计结束时间 {{ item.deliveryTime }}</view>
									</view>
								</view>
								<view class="total">
									合计:
									<text class="total-price">
										￥{{ res.goodsList[0].price }}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="evaluate btn" @click="CancelNewOrder(res.id)">取消订单</view>
								</view>
							</view>
							<u-loadmore v-show="pageInfo.page < pageInfo.total_pages" :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view v-else>
							<scroll-view scroll-y style="height: 100%;width: 100%;">
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
							</scroll-view>
						</view>
						<!--
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
						-->
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import api from "../../api/index.js"
	import order from "../../utils/order.js"
	import moment from "moment"
	export default {
		data() {
			return {
				orderList: [
					[],
					[],
					[],
					[]
				],
				/*dataList: [{
						id: 1,
						store: '夏日流星限定贩卖',
						deal: '交易成功',
						goodsList: [{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '灰色;M',
								deliveryTime: '付款后30天内发货',
								price: '348.58',
								number: 2
							},
							{
								goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
								title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
								type: '45cm;S',
								deliveryTime: '付款后30天内发货',
								price: '135.00',
								number: 1
							}
						]
					},
				],*/
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
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				pageInfo: {
					page: 1,
					pageSize: 10,
					total_pages: 0
				}
			};
		},
		onLoad: function(option) {
			this.swiperCurrent = option.orderBarNumber;
			this.getOrderList(option.orderBarNumber);
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
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
				return strs.join("/")
			},
			generateQueryParam(status) {
				let s = []
				status.forEach(st => {
					s.push(`order_status=${st}`)
				})
				return s.join("&")
			},
			// 页面数据
			getOrderList(idx) {
				this.orderList[idx] = []
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
						const lists = data.data.lists === null ? [] : data.data.lists
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
									groomerCount: list.children.groomer.id === 0 ? 0 : 1,
									basic: list.payment.detail.basic,
									commission: list.payment.detail.commission,
									price: list.payment.detail.total_pay,
									groomer: {
										accountID: list.children.groomer.account_id,
										avatarUrl: list.children.groomer.avatar,
										nickName: list.children.groomer.nick_name,
										favor: list.children.groomer.favor,
										status: list.children.groomer.status,
										name: list.children.groomer.name,
										phone: "123456",
										isVerified: list.children.groomer.is_verified,
										isCertifiedGroomer: list.children.groomer.is_certified_groomer,
										qualification: list.children.groomer.qualification,
									},
									matchID: list.children.match_order.id
								}]
							}
							this.orderList[idx].push(lst)
						})
						this.pageInfo.total_pages = data.data.pagination.total_pages
					}
				})
				this.loadStatus.splice(this.current,1,"loadmore")
				// for(let i = 0; i < 5; i++) {
				// 	let index = this.$u.random(0, this.dataList.length - 1);
				// 	let data = JSON.parse(JSON.stringify(this.dataList[index]));
				// 	data.id = this.$u.guid();
				// 	this.orderList[idx].push(data);
				// }
				// this.loadStatus.splice(this.current,1,"loadmore")
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
							url: `../pethouse_order_history/index?orderBarNumber=${statusBar}`
						})
					},
					fail: (err) => {
						uni.redirectTo({
							url: `../pethouse_order_history/index?orderBarNumber=${statusBar}`
						})
					}
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
								this.CancelOutofTime(id, 1)
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
			
			CancelOutofTime(id, statusBar){
				uni.request({
					url: `${api.baseUrl}/api/v1/order/pethouse/cancel/${id}`,
					method: "DELETE",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: () => {
						uni.redirectTo({
							url: `../pethouse_order_history/index?orderBarNumber=${statusBar}`
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
							url: `../pethouse_order_history/index?orderBarNumber=${statusBar}`
						})
					},
					fail: (err) => {
						uni.redirectTo({
							url: `../pethouse_order_history/index?orderBarNumber=${statusBar}`
						})
					}
				})
			},
			
			// 美容师简报
			GetGroomerAbstract(nickName, avartarURL, favor, isVerified, isCertified, phone, qualification) {
				uni.navigateTo({
					url: `../groomer_abstract/index?nick_name=${nickName}&avartar=${avartarURL}&favor=${favor}&is_verified=${isVerified}&is_certified=${isCertified}&phone=${phone}&qualification=${qualification}`
				})
			},
			
			releaseOrder() {
				uni.redirectTo({
					url: "../release_orders/index"
				})
			},
			
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.pageInfo.page = 1;
				this.pageInfo.total_pages = 0;
				this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
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
			margin: 20rpx 0 0;

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

				.delivery-time {
					color: #e5d001;
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
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
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
