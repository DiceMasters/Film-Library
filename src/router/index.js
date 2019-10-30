import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import Home from '@/views/Home'
import TasksPage from '@/views/TasksPage'
import Login from '@/views/Auth/Login'
import Registration from '@/views/Auth/Registration'

import store from '../store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		beforeEnter(to, from, next) {
			store.getters.checkUser ? next() : next('/login')
		}
	},
	{
		path: '/tasks',
		name: 'tasks',
		component: TasksPage,
		beforeEnter(to, from, next) {
			store.getters.checkUser ? next() : next('/login')
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/registration',
		name: 'registration',
		component: Registration
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
