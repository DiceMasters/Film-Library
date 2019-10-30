import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPencilAlt, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faPencilAlt, faEyeSlash, faEye)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuelidate)

Vue.config.productionTip = false

/**
 * Firebase конфиг настраивается на firebase.google.com
 * Готовое приложение доступно по https://film-library-ac2c2.firebaseapp.com
 */

const firebaseConfig = {
	apiKey: "...",
	authDomain: "...",
	databaseURL: "...",
	projectId: "...",
	storageBucket: "...",
	messagingSenderId: "...",
	appId: "..."
}
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged( user => {
	if (user) {
		store.dispatch('loggedUser', user)
	}

	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')

	store.dispatch('loadTasks')
})
