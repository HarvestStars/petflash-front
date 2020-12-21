
const state = {
	hasLogin: uni.getStorageSync('hasLogin'),
	userInfo: uni.getStorageSync('userInfo'),
	smsInfo: uni.getStorageSync('smsInfo'),
	token: uni.getStorageSync("token"),
	requireRols: ["PetHouse", "Groomer"],
	region: uni.getStorageSync('region'),
	location: uni.getStorageSync('location'),
	qualification: uni.getStorageSync('qualification'),
}

const mutations = {
	// SET_PLAN_STATUS_CHANGE: (state, status) => {
	// state.planStatusChange = status
	// }
	SET_HAS_LOGIN: (state, status) => {
		state.hasLogin = status
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
	SET_SMS_INFO: (state, smsInfo) => {
		state.smsInfo = smsInfo
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_REGION: (state, region) => {
		state.region = region
	},
	SET_LOCATION: (state, location) => {
		state.location = location
	},
	SET_QUALIFICATION: (state, qualification) => {
		state.qualification = qualification
	}
}

const actions = {
	// set_planStatusChange({ commit }, status) {
	// commit('SET_PLAN_STATUS_CHANGE', status)
	// }
	setUserInfo({
		commit
	}, userInfo) {
		commit('SET_HAS_LOGIN', true)
		commit('SET_USER_INFO', userInfo)
		uni.setStorage({
			key: 'userInfo',
			data: userInfo
		})
	},
	setToken({commit}, tokenInfo) {
		commit('SET_TOKEN', tokenInfo)
		uni.setStorage({
			key: 'token',
			data: tokenInfo
		})
	},
	logout({
		commit
	}) {
		uni.removeStorage({
			key: 'hasLogin'
		})
		uni.removeStorage({
			key: 'userInfo'
		})

		const hasLogin = false
		const userInfo = {}

		commit('SET_HAS_LOGIN', hasLogin)
		commit('SET_USER_INFO', userInfo)
	},
	updateUserInfo({
		commit
	}, userInfo) {
		//userInfo.token = ""
		commit('SET_USER_INFO', userInfo)
		uni.setStorage({
			key: 'userInfo',
			data: userInfo
		})
	},
	setSmsCode({commit}, smsInfo) {
		commit("SET_SMS_INFO", smsInfo)
		uni.setStorage({
			key: 'smsInfo',
			data: smsInfo
		})
	},
	setRegion({commit}, region) {
		commit("SET_REGION", region)
		uni.setStorage({
			key: 'region',
			data: region
		})
	},
	setLocation({commit}, location) {
		commit("SET_LOCATION", location)
		uni.setStorage({
			key: 'location',
			data: location
		})
	},
	setQualification({commit}, qualification) {
		commit("SET_QUALIFICATION", qualification)
		uni.setStorage({
			key: 'qualification',
			data: qualification
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
