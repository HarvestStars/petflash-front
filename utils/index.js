export default {
	removeElement: function(arr, eleName) {
		if (!arr instanceof Array) {
			return arr
		}
		let index = arr.indexOf(eleName)
		if (index === -1) {
			return arr
		}
		return arr.splice(index, 1)
	},

	validatePhoneNumber: function(phoneNumber) {
		return /^1[3-9]\d{9}$/.test(phoneNumber)
	},

	validateVerifyCode: function(verifyCode) {
		console.log(verifyCode)
		return verifyCode.toString().length === 4
	},

	navigatorSuccess: function() {
		console.log('navigatorSuccess')
	},
	navigatorFail: function() {
		console.log('navigatorFail')
	},
	navigatorConplete: function() {
		console.log('navigatorConplete')
	},
	
}
