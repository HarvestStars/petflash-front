<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 0,
				longitude: 0
			}
		},
		mounted() {
			uni.getLocation({
				success: function(address) {
					this.latitude = address.latitude
					this.longitude = address.longitude
					console.log(address, uni.getLocation, this.latitude)
				}
			})
		},
		methods: {

		}
	}
</script>

<style>
.uni-map {
	height: 100vh;
	width: 100vw;
}
</style>
