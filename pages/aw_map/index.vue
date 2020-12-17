<template>
	<view>
		<view class="position-select-container">
			<u-row>
				<u-col :span="9">
					<u-input class="position-select" placeholder="请选位置" v-model="positionLabel" type="text" border clearable />
				</u-col>
				<u-col :span="3">
					<button type="primary" size="mini">确定</button>
				</u-col>
			</u-row>
		</view>
		<view class="cu-bar bg-gray map-container">
			<map id="map" :latitude="latitude" :longitude="longitude" class="uni-map" show-compass show-location></map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 0,
				longitude: 0,
				mapContext: null,
				positionLabel: ''
			}
		},
		onReady() {
			this.initMap();
		},
		methods: {
			initMap() {
				this.mapContext = uni.createMapContext("map", this)
				uni.getLocation({
					success: (address) => {
						console.log(address)
						this.mapContext.moveToLocation({
							longitude: address.longitude,
							latitude: address.latitude,
						})
					}
				})
			},
		}
	}
</script>

<style>
	.map-container {
		height: calc(100vh - 48px);
		width: 100vw;
	}

	.uni-map,
	.release-order-conntainer {
		height: calc(100vh - 48px);
		width: 100vw;
	}

	.position-select-container {
		/* height: 10vh; */
		background-color: #FFFFFF;

	}

	.position-select {
		margin: 10rpx 10rpx 10rpx 10rpx;
		background-color: #FFFFFF;
	}
</style>
