import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import store from './store'
import uView from 'uview-ui';

Vue.use(uView);

Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
