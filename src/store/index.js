import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import task from './task'
import user from './user'
import common from './common'

export default new Vuex.Store({
	modules: {
		task,
		user,
		common
	}
})
