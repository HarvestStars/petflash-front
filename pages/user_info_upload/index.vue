<template>
	<view>
		<u-cell-group>
			<u-cell-item icon="setting-fill" title="身份认证" value="已认证" @click="verifyClick(0)"></u-cell-item>
			<u-cell-item icon="integral-fill" title="资质认证" value="未认证" @click="verifyClick(1)"></u-cell-item>
			<u-cell-item icon="integral-fill" title="个人资料" @click="verifyClick(2)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			verifyClick(e) {
				switch (e) {
					case 0:
						uni.navigateTo({
							url: "../id_verify/index"
						})
						break
					case 1:
						uni.navigateTo({
							url: "../certification_verify/index"
						})
						break
					case 2:
						uni.navigateTo({
							url: "../personal_info/index"
						})
						break
				}
			}
		}
	}
</script>

<style>

</style>
