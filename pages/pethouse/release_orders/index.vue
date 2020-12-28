<template>
	<view class="wrap">
		<u-form :model="orderForm" ref="uForm" label-width="180">
			<u-form-item label="门店区域">
				<u-button slot="right" :type="regionFlag ? 'success' : 'warning'" size="mini">{{regionShow}}</u-button>
			</u-form-item>
			<!--  洗剪吹/遛狗 -->
			<u-form-item label="起始时间" v-show="orderForm.orderTypeIndex !== 'PickUp'">
				<u-input placeholder="请选择订单起始时间" v-model="orderForm.startTime" type="select" input-align="right" @click="startTimePickerShow = true" />
				<u-picker mode="time" v-model="startTimePickerShow" :params="params" @confirm="startTimeConfirm"></u-picker>
			</u-form-item>

			<u-form-item label="结束时间" v-show="orderForm.orderTypeIndex !== 'PickUp'">
				<u-input placeholder="请选择订单结束时间" v-model="orderForm.endTime" type="select" input-align="right" @click="endTimePickerShow = true" />
				<u-picker mode="time" v-model="endTimePickerShow" :params="params" @confirm="endTimeConfirm"></u-picker>
			</u-form-item>

			<!-- 洗剪吹 -->
			<u-form-item label="订单属性" v-show="orderForm.orderTypeIndex === 'WCB'">
				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox v-model="item.checked" active-color="green" 
					v-for="(item, index) in  washCutBlowCheckboxList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="付费模式" v-show="orderForm.orderTypeIndex === 'WCB'">
				<u-radio-group v-model="orderForm.payWay" @change="radioGroupChange">
					<u-radio v-for="(item, index) in payWayCheckboxList" :key="index" :name="index" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="底薪(元)" v-show="orderForm.orderTypeIndex === 'WCB' && [0, 2].indexOf(orderForm.payWay) > -1">
				<u-input placeholder="0" v-model.number="orderForm.basePay" type="number" input-align="right" />
			</u-form-item>
			<u-form-item label="提成(%)" v-show="orderForm.orderTypeIndex === 'WCB' && [1, 2].indexOf(orderForm.payWay) > -1">
				<u-input placeholder="0" v-model.number="orderForm.deductPercentage" type="number" input-align="right" />
			</u-form-item>

			<!-- 遛狗 -->
			<u-form-item label="订单属性" v-show="orderForm.orderTypeIndex === 'WalkTheDog'">
				<u-checkbox-group>
					<u-checkbox v-model="item.checked" v-for="(item, index) in  walkDogCheckboxList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="宠物数量" v-show="orderForm.orderTypeIndex === 'WalkTheDog'">
				<u-input v-model="orderForm.basePay" type="number" input-align="right" />
				<view style="padding-left: 10rpx;">只</view>
			</u-form-item>
			<u-form-item label="一口价" v-show="orderForm.orderTypeIndex === 'WalkTheDog'">
				<u-input v-model="orderForm.basePay" type="number" input-align="right" />
				<view style="padding-left: 10rpx;">元</view>
			</u-form-item>

			<!-- 接送 -->
			<u-form-item label="模式选择" v-show="orderForm.orderTypeIndex === 'PickUp'">
				<u-input placeholder="请选择模式" v-model="orderForm.pickUpWay" type="select" input-align="right" @click="pickUpWayShow = true" />
				<u-select v-model="pickUpWayShow" :list="pickUpWayList" @confirm="pickUpWayConfirm"></u-select>
			</u-form-item>
			<u-form-item label="上车地点" v-show="orderForm.orderTypeIndex === 'PickUp'">
				<u-input placeholder="请选择上车地点" v-model="orderForm.getOnPosition" type="text" input-align="right" @click="handleGetOnPosition" />
			</u-form-item>
			<u-form-item label="上车时间" v-show="orderForm.orderTypeIndex === 'PickUp'">
				<u-input placeholder="请选择上车时间" v-model="orderForm.getOnTime" type="select" input-align="right" @click="getOnTimeShow = true" />
				<u-picker mode="time" v-model="getOnTimeShow" :params="params" @confirm="getOnTimeConfirm"></u-picker>
			</u-form-item>
			<u-button class="margin-top" type="warning" @click="handleConfirm">确定发布</u-button>
		</u-form>
	</view>
</template>

<script>
	import api from "../../../api/index.js"
	import moment from "moment"
	import order from "../../../utils/order.js"
	export default {
		data() {
			return {
				city: this.$store.getters.userInfo.city,
				region: this.$store.getters.userInfo.region ? this.$store.getters.userInfo.region : "",
				regionShow: this.$store.getters.userInfo.region ? this.$store.getters.userInfo.region : "在门店信息中设置",
				regionFlag: this.$store.getters.userInfo.region ? true : false,
				orderForm: {
					orderTypeIndex: "WCB",
					orderType: "WCB",
					startTime: "",
					endTime: "",
					payWay: 0,
					basePay: 0.0,
					deductPercentage: 0,
					pickUpWay: '',
					pickUpWayIndex: '',
					getOnTime: '',
					getOnPosition: '',
				},
				washCutBlowCheckboxList: [{
						id: 1,
						name: order.orderServices[1],
						checked: false,
						disabled: false
					},
					{
						id: 2,
						name: order.orderServices[2],
						checked: false,
						disabled: false
					},
					{
						id: 3,
						name: order.orderServices[3],
						checked: false,
						disabled: false
					},
					{
						id: 4,
						name: order.orderServices[4],
						checked: false,
						disabled: false
					},
					{
						id: 5,
						name: order.orderServices[5],
						checked: false,
						disabled: false
					},
					{
						id: 6,
						name: order.orderServices[6],
						checked: false,
						disabled: false
					}
				],
				walkDogCheckboxList: [{
					name: '清洗笼舍',
					checked: false,
					disabled: false
				}, {
					name: '小区上门',
					checked: false,
					disabled: false
				}, {
					name: '爬行类',
					checked: false,
					disabled: false
				}],
				payWayCheckboxList: [{
						name: '纯底薪',
						checked: false,
						disabled: false
					},
					{
						name: '纯提成',
						checked: false,
						disabled: false
					},
					{
						name: '混合模式',
						checked: false,
						disabled: false
					}
				],
				startTimePickerShow: false,
				endTimePickerShow: false,
				orderPickerShow: false,
				pickUpWayShow: false,
				getOnTimeShow: false,
				orderPickerlist: [{
					value: 'WCB',
					label: '洗剪吹'
				}, {
					value: 'WalkTheDog',
					label: '遛狗'
				}, {
					value: 'PickUp',
					label: '接送'
				}],
				pickUpWayList: [{
					value: '1',
					label: '单程(送)'
				}, {
					value: '2',
					label: '往返'
				}],
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				serviceItems: []
			}
		},
		methods: {
			orderTypeConfirm(e) {
				console.log(e)
				this.orderForm.orderType = e[0].value
				this.orderForm.orderTypeIndex = e[0].value
			},
			pickUpWayConfirm(e) {
				console.log(e)
				this.orderForm.pickUpWay = e[0].value
				this.orderForm.pickUpWayIndex = e[0].value
			},
			startTimeConfirm(e) {
				this.orderForm.startTime = e.year + "-" + e.month + "-" + e.day + " " + e.hour + ":" + e.minute
			},
			endTimeConfirm(e) {
				this.orderForm.endTime = e.year + "-" + e.month + "-" + e.day + " " + e.hour + ":" + e.minute
			},
			getOnTimeConfirm(e) {
				this.orderForm.getOnTime = e.year + "/" + e.month + "/" + e.day + " " + e.hour + ":" + e.minute
			},
			handleGetOnPosition(e) {
				console.log("handleGetOnPosition", e)
				uni.navigateTo({
					url: "../aw_map/index"
				})
			},
			radioGroupChange(index) {
				this.orderForm.deductPercentage = 0
				this.orderForm.basePay = 0
				console.log("radioGroupChange", index, this.orderForm.payWay)
			},
			checkboxGroupChange(e) {
				this.serviceItems = []
				console.log("checkboxGroupChange", e)
				e.forEach(ele => {
					for (let i=0; i<this.washCutBlowCheckboxList.length; i++) {
						if (ele === this.washCutBlowCheckboxList[i].name && this.serviceItems.indexOf(this.washCutBlowCheckboxList[i].id) === -1) {
							this.serviceItems.push(this.washCutBlowCheckboxList[i].id)
						}
					}
				})
			},
			handleConfirm() {
				console.log("handleConfirm", this.$store.getters, this.orderForm)
				uni.request({
					url: `${api.baseUrl}/api/v1/order/pethouse/create/?order_type=${this.orderForm.orderType}`,
					method: "POST",
					header: {
						"content-type": "application/json",
						Authorization: `${this.$store.getters.token.token_type} ${this.$store.getters.token.access_token}`
					},
					data: {
						requested_at: moment.now(),
						started_at: moment(new Date(this.orderForm.startTime)).utc().valueOf(),
						finished_at: moment(new Date(this.orderForm.endTime)).utc().valueOf(),
						service_items: this.serviceItems,
						basic: parseFloat(this.orderForm.basePay.valueOf()),
						commission: parseInt(this.orderForm.deductPercentage.valueOf()),
						city: this.city,
						region: this.region
					},
					success: ({data}) => {
							uni.redirectTo({
								url: "../order_history/index?current=0"
							})
					},
					fail: (error) => {
						console.log(error)
					}
				})
			}
		}
	}
</script>

<style>
	.wrap {
		padding: 30rpx;
		background-color: #FFFFFF;
	}
</style>
