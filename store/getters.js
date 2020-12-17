const getters = {
	hasLogin: state => state.user.hasLogin,
	requireRols: state => state.user.requireRols,
	userInfo: state => state.user.userInfo,
	smsInfo: state => state.user.smsInfo,
	token: state => state.user.token
}

export default getters
