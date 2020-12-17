<template>
	<view style="background-color: #FFFFFF; height: calc(100vh - 48px);">
		<view class="title">
			<view>{{orderDetail.orderTypeLable}}</view>
		</view>
		<view class="detail">
			<u-form :model="orderDetail" ref="oForm" label-width="140" label-position="top" border-bottom>
				<u-form-item label=" 店面位置">
					<u-input :value="orderDetail.positionLable" />
					<u-input :value="orderDetail.shopName" />
				</u-form-item>
				<u-form-item label="到店时间">
					<view style="text-align: center;width: 100%;">{{orderDetail.orderStartTime}}</view>
				</u-form-item>
				<u-form-item label="服务时长">
					<view style="text-align: center;width: 100%;">{{orderDetail.totalTime}}小时</view>
				</u-form-item>
				<u-form-item label="服务内容">
					<u-checkbox-group disabled>
						<u-checkbox v-model="propertyChecked" v-for="(item, index) in orderDetail.orderProperty" :key="index" @change="handlePropertyChange">
							{{ property2Label[item] }}
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="支付模式" :border-bottom="false">
					<u-table border-color="#FFFFFF">
						<u-tr>
							<u-td>
								<u-radio-group v-model="priceChecked">
									<u-radio name="price">
										固定薪水
									</u-radio>
								</u-radio-group>
							</u-td>
							<u-td>{{orderDetail.price}}元</u-td>
						</u-tr>
						<u-tr>
							<u-td>
								<u-radio-group v-model="percentageChecked">
									<u-radio name="percentage">
										提成
									</u-radio>
								</u-radio-group>
							</u-td>
							<u-td>{{orderDetail.percentage}}%</u-td>
						</u-tr>
					</u-table>
				</u-form-item>
				<u-form-item label="取消规则">
					<view class="cancel-rule">
						在已经订单确认时间(接单后10分钟)后无法取消
					</view>
				</u-form-item>
			</u-form>
			<button type="warn">取消订单</button>
		</view>
	</view>
</template>

<script>
	import moment from "moment"
	export default {
		data() {
			return {
				propertyChecked: true,
				priceChecked: '',
				percentageChecked: '',
				payWayOptions: [{
					key: 0,
					value: "底薪"
				}, {
					key: 1,
					value: "提成"
				}, {
					key: 2,
					value: "底薪+提成"
				}],
				property2Label: {
					0: "猫",
					1: "中型犬",
					2: "需要洁牙",
					3: "爬行类",
					4: "鸟类",
				},
				orderId: null,
				orderDetail: {
					orderTypeLable: "洗剪吹",
					positionLable: "上海徐汇区虹漕路999号",
					shopName: "佳佳宠物美容中心",
					orderStartTime: "2020-01-01 00:00",
					orderEndTime: "2020-01-01 02:00",
					totalTime: "",
					payWay: 1,
					price: 500,
					percentage: 80,
					orderProperty: [0, 1, 2, 3],
				}
			}
		},
		onLoad(options) {
			console.log(options, "onLoad")
			this.orderId = options.orderId
			this.orderDetail.totalTime = moment.duration((moment(this.orderDetail.orderEndTime, "YYYY-MM-DD HH:mm").format("x") -
				moment(this.orderDetail.orderStartTime, "YYYY-MM-DD HH:mm").format("x"))).hours()
			console.log(this.orderDetail)
			switch (this.orderDetail.payWay) {
				case 1:
					this.priceChecked = 'price';
					break
				case 2:
					this.percentageChecked = 'percentage';
					break
				default:
					this.priceChecked = 'price';
					this.percentageChecked = 'percentage';
			}
		},
		methods: {
			handlePropertyChange(e) {
				console.log(e, "handlePropertyChange")
				this.propertyChecked = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		background-color: #FFFFFF
	}

	.title {
		height: 15vh;
		width: 100vw;
		text-align: center;
		font-size: 28px;
		font-weight: 400;
		vertical-align: middle;
		line-height: 15vh;
	}

	.detail {
		padding: 0 25rpx;
	}

	.cancel-rule {
		font-family: PingFangSC;
		font-weight: 400;
		font-size: 14px;
		color: rgba(16, 16, 16, 0.6);
		font-style: normal;
	}

	/deep/ .u-checkbox__icon-wrap--disabled {
		background-color: #2979ff !important;
		border-color: #2979ff !important;
	}

	// /deep/ .u-radio__icon-wrap--disabled {
	// 	background-color: #2979ff !important;
	// 	border-color: #2979ff !important;
	// }
</style>
