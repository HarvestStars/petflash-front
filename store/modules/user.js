
const state = {
	hasLogin: uni.getStorageSync('hasLogin'),
	userInfo: uni.getStorageSync('userInfo'),
	smsInfo: uni.getStorageSync('smsInfo'),
	token: uni.getStorageSync("token"),
	requireRols: ["PetHouse", "Groomer"]
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
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
