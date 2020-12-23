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
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.goodsList[0].pethouse.nickName}} - {{res.goodsList[0].pethouse.location }}</view>
									</view>
									<view class="right">										
										<text class="worker-info" 
										@click="GetPetHouseAbstract(res.goodsList[0].pethouse.nickName, res.goodsList[0].pethouse.favor,
										res.goodsList[0].pethouse.location, res.goodsList[0].pethouse.phone, res.goodsList[0].pethouse.isVerified,res.goodsList[0].pethouse.isCertifiedHouse)">
										门店简介</text>
									</view>
								</view>
								<view class="item">
									<view class="content">
										<view class="title u-line-2">{{ res.goodsList[0].title }}</view>
										<view class="delivery-time"> 时段: {{ res.goodsList[0].deliveryTime }} ~ {{ res.goodsList[0].deliveryTime }}</view>
									</view>
								</view>
								<text>\n</text>
								
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
									</view>
									<view class="evaluate btn" @click="CreateMatchOrder(res.id)">确认接单</view>
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
											该区域目前没有订单
											<view class="tips">请耐心等待，或者换个区域接单哦~</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-bar tabbar bg-white shadow foot">
							<view class="action">
								<view>
									<FontAwesome type="fas fa-receipt" size="40" fw :class="'text-gray'"></FontAwesome>
								</view>
								<u-picker
									mode="region" 
									v-model="show" 
									@confirm="regionSelect"
									:area-code='["31", "3101", "310101"]' 
									:params="params"
									></u-picker>
								<view class="bar-icon" :class="'text-gray'" @click="show = true">{{ region != "" ? region : "地区选择" }}</view>
							</view>
							<view class="action">
								<view>
									<FontAwesome type="fas fa-user-circle" size="40" fw :class="activeItem === 2? 'text-green': 'text-gray'"></FontAwesome>
								</view>
								<view class="bar-icon" :class="'text-gray'" @click="regionReset">显示全部</view>
							</view>
						</view>
					</view>
					<view class="page-box" v-if="current === 1">
						<view v-if="orderList[1].length > 0">
							<view class="order" v-for="res in orderList[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.goodsList[0].pethouse.nickName}} - {{res.goodsList[0].pethouse.location }}</view>
									</view>
									<view class="right">										
										<text class="worker-info" 
										@click="GetPetHouseAbstract(res.goodsList[0].pethouse.nickName, res.goodsList[0].pethouse.favor,
										res.goodsList[0].pethouse.location, res.goodsList[0].pethouse.phone, res.goodsList[0].pethouse.isVerified,res.goodsList[0].pethouse.isCertifiedHouse)">
										门店简介</text>
									</view>
								</view>
								<view class="item">
									<view class="content">
										<view class="title u-line-2">{{ res.goodsList[0].title }}</view>
										<view class="delivery-time">{{ res.goodsList[0].deliveryTime }} ~ {{ res.goodsList[0].deliveryTime }}</view>
										<view class="delivery-time">接单时间 {{ res.goodsList[0].matchTime }}</view>
										<text>\n</text>
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
									<view class="evaluate btn" @click="CancelRunningOrder(res.id, res.goodsList[0].matchTime)">取消订单</view>
									<view class="exchange btn">完成后店主确认</view>
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
											<view class="tips">马上去接单吧!</view>
										</view>
										<view class="btn" @click="releaseOrder">去接单</view>
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
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.goodsList[0].pethouse.nickName}} - {{res.goodsList[0].pethouse.location }}</view>
									</view>
									<view class="right">										
										<text class="worker-info" 
										@click="GetPetHouseAbstract(res.goodsList[0].pethouse.nickName, res.goodsList[0].pethouse.favor,
										res.goodsList[0].pethouse.location, res.goodsList[0].pethouse.phone, res.goodsList[0].pethouse.isVerified,res.goodsList[0].pethouse.isCertifiedHouse)">
										门店简介</text>
									</view>
								</view>
								<view class="item">
									<view class="content">
										<view class="title u-line-2">{{ res.goodsList[0].title }}</view>
										<view class="delivery-time">{{ res.goodsList[0].startTime }} ~ {{ res.goodsList[0].deliveryTime }}</view>
									</view>
								</view>
								<view class="total">
									合计:
									<text class="total-price">
										￥{{ res.goodsList[0].totalPay }}
									</text>
								</view>
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
				show: false,
				params: {
					province: true,
					city: true,
					area: true
				},
				
				city:"",
				region: "",
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
			if (option.region === undefined){
				this.region = "";
			}else{
				this.region = option.region;
			}
			 
		},
		
		// 在当前page中等待页面数据的变化, 等待回调然后刷新页面数据
		onShow: function(){
			console.log("onShow: running order list length");
			if (this.current === 0){
				this.getActiveList();
			}else{
				this.getOrderList(this.current);	
			}
		},
		
		methods: {
			reachBottom() {
				console.log("reachBottom", this.pageInfo)
				this.loadStatus.splice(this.current, 1, "loading")
				if (this.pageInfo.page < this.pageInfo.total_pages) {
					this.pageInfo.page += 1
					if (this.current === 0){
						this.getActiveList();
					}else{
						this.getOrderList(this.current);	
					}
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
			
			// 区域选择
			regionSelect(e){
				this.city = (e.city.label === "市辖区") ? e.province.label : e.city.label;
				this.region = e.area.label;
				console.log("区域选择",this.region);
				if (e.city.label === "市辖区"){
					this.input = e.province.label + '-' + e.area.label;
				}else{
					this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				};
				uni.redirectTo({
					url: `../order_history/index?current=0&region=${this.region}`
				})
			},
			
			// 区域重置
			regionReset(){
				this.region = "";
				uni.redirectTo({
					url: `../order_history/index?current=0`
				})
			},
			
			// 获取等待接单列表
			getActiveList() {
				console.log("getActiveList 触发页面数据获取")
				uni.request({
					url: `${api.baseUrl}/api/v1/order/groomer/active?page_size=${this.pageInfo.pageSize}&page_index=${this.pageInfo.page}&region=${this.region}`,
					method: "GET",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: ({
						data
					}) => {
						console.log("getActiveList 历史数据页面的request数据回调开始")
						this.orderList[0] = [];
						const lists = data.data.lists === null ? [] : data.data.lists;
						console.log("获取的数据",lists)
						lists.forEach(list => {
							const lst = {
								id: list.id,
								deal: order.orderStatus[list.status],
								goodsList: [{
									title: this.serviceIdToStr(list.service_items),
									status: order.orderStatus[list.status],
									startTime: moment(new Date(list.started_at)).format('YYYY-MM-DD HH:mm'),
									deliveryTime: moment(new Date(list.finished_at)).format('YYYY-MM-DD HH:mm'),
									basic: list.payment.detail.basic,
									commission: list.payment.detail.commission,
									totalPay: list.payment.detail.total_pay,
									pethouse: {
										accountID: list.pethouse.account_id,
										avatarUrl: list.pethouse.avatar,
										nickName: list.pethouse.nick_name,
										city: list.pethouse.city,
										region: list.pethouse.region,
										location: list.pethouse.location,
										favor: list.pethouse.favor,
										phone: list.pethouse.phone,
										isVerified: list.pethouse.is_verified,
										isCertifiedHouse: list.pethouse.is_certified_house,
									},
								}]
							}
							this.orderList[0].push(lst);
						})
						this.pageInfo.total_pages = data.data.pagination.total_pages
					}
				})
				console.log("待接单list长度",this.orderList[0].length)
				this.loadStatus.splice(this.current,1,"loadmore")
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
					url: `${api.baseUrl}/api/v1/order/groomer/list?page_size=${this.pageInfo.pageSize}&page_index=${this.pageInfo.page}&${this.generateQueryParam(idx2Status[idx])}`,
					method: "GET",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: ({
						data
					}) => {
						console.log("getOrderList 历史数据页面的request数据回调开始")
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
									startTime: moment(new Date(list.parent.requirement_order.started_at)).format('YYYY-MM-DD HH:mm'),
									deliveryTime: moment(new Date(list.parent.requirement_order.finished_at)).format('YYYY-MM-DD HH:mm'),
									matchTime: moment(new Date(list.created_at)).format('YYYY-MM-DD HH:mm'),
									basic: list.parent.requirement_order.payment.detail.basic,
									commission: list.parent.requirement_order.payment.detail.commission,
									totalPay: list.parent.requirement_order.payment.detail.total_pay,
									isComment: list.is_comment_to,
									pethouse: {
										accountID: list.parent.tu_pethouse.account_id,
										avatarUrl: list.parent.tu_pethouse.avatar,
										nickName: list.parent.tu_pethouse.nick_name,
										city: list.parent.tu_pethouse.city,
										region: list.parent.tu_pethouse.region,
										location: list.parent.tu_pethouse.location,
										favor: list.parent.tu_pethouse.favor,
										phone: list.parent.tu_pethouse.phone,
										isVerified: list.parent.tu_pethouse.is_verified,
										isCertifiedHouse: list.parent.tu_pethouse.is_certified_house,
									},
									PetHouseOrderID: list.pethouse_order_id,
								}]
							}
							this.orderList[idx].push(lst);
						})
						this.pageInfo.total_pages = data.data.pagination.total_pages
					}
				})
				console.log("list长度",this.orderList[idx].length)
				this.loadStatus.splice(this.current,1,"loadmore")
			},

			// 接单
			CreateMatchOrder(id){
				uni.showModal({
					title: '提示',
					content: '确定接单吗?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							this.CreateOrder(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)	
				})
			},

			CreateOrder(id){
				uni.request({
					url: `${api.baseUrl}/api/v1/order/groomer/create/${id}`,
					method: "POST",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: () => {
						uni.redirectTo({
							url: `../order_history/index?current=1`
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
							this.CancelOrder(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)	
				})
			},
			
			CancelOrder(id){
				uni.request({
					url: `${api.baseUrl}/api/v1/order/groomer/cancel/${id}`,
					method: "DELETE",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					success: () => {
						uni.redirectTo({
							url: `../order_history/index?current=1`
						})
					}
				})
			},
			
			// 门店简报
			GetPetHouseAbstract(nickName, favor, location, phone, isVerified, isCertifiedHouse) {
				uni.navigateTo({
					url: `../../pethouse/abstract/index?nick_name=${nickName}&favor=${favor}&location=${location}&phone=${phone}&is_verified=${isVerified}&is_certified_house=${isCertifiedHouse}`
				})
			},
			
			
			// 写评论
			sendComment(idx) {
				uni.navigateTo({
					url: `../../common/comment/index?order_id=${idx}&comment_type=ToPetHouseOrder`
				})
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
				if (this.current === 0){
					this.getActiveList();
				}else{
					this.getOrderList(this.current);	
				}
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
