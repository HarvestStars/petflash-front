<template>
	<view style="padding: 24rpx;">
		<u-field v-model="business" label="业务特长" placeholder="请输入">
		</u-field>
		<u-button type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				business: ""
			}
		},
		methods: {
			submit() {
				console.log("submit", business)
			}
		}
	}
</script>

<style>

</style>
