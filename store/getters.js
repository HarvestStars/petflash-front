const getters = {
	hasLogin: state => state.user.hasLogin,
	requireRols: state => state.user.requireRols,
	userInfo: state => state.user.userInfo,
	smsInfo: state => state.user.smsInfo,
	token: state => state.user.token,
	
	region: state => state.user.region,
	location: state => state.user.location,
	qualification: state => state.user.qualification,
}

export default getters
