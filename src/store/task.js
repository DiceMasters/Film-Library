import firebase from 'firebase/app'
import Task from './task_help'

export default {
	state: {
		tasks: []
	},
	mutations: {
		loadTasks(state, payload) {
			state.tasks = payload
		},
		newTask(state, payload) {
			state.tasks.push(payload)
		},
		editTask(state, {id, title, description, type}) {
			const task = state.tasks.find( val => val.id === id )
			
			task.title = title
			task.description = description
			task.type = type
		},
		completeTask(state, {id, completed}) {
			const task = state.tasks.find( val => val.id === id )
			
			task.completed = completed
		}
	},
	actions: {
		async loadTasks({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const task = await firebase.database().ref('tasks').once('value'),
					  tasks = task.val(),
					  tasksArray = []

				Object.keys(tasks).forEach( key => {
					const t = tasks[key]
					tasksArray.push( new Task(
						t.title,
						t.description,
						t.type,
						t.completed,
						t.editing,
						t.user,
						key
					))
				})

				commit('loadTasks', tasksArray)
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err.message)
				console.info('No tasks matching...')
			}
		},
		async newTask({commit, getters}, payload) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const newTask = new Task(
					payload.title,
					payload.description,
					payload.type,
					payload.completed,
					payload.editing,
					getters.user.id
				)
				const task = firebase.database().ref('tasks').push(newTask)

				commit('newTask', {
					...newTask,
					id: task.key
				})
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err.message)
				throw err
			}
		},
		async editTask({commit}, {id, title, description, type}) {
			commit('clearError')
			commit('setLoading', true)
			try {
				await firebase.database().ref('tasks').child(id).update({
					title,
					description,
					type
				})

				commit('editTask', {id, title, description, type})
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err.message)
				throw err
			}
		},
		async deleteTask({commit}, id) {
			commit('clearError')
			commit('setLoading', true)
			try {
				await firebase.database().ref('tasks').child(id).remove()
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err.message)
				throw err
			}
		},
		async completeTask({commit}, {id, completed}) {
			commit('clearError')
			commit('setLoading', true)
			try {
				await firebase.database().ref('tasks').child(id).update({
					completed
				})

				commit('completeTask', {id, completed})
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err.message)
				throw err
			}
		}
	},
	getters: {
		tasks(state, getters) {
			return state.tasks.filter( task => task.user === getters.user.id )
		},
		tasksCompleted(state, getters) {
			return getters.tasks.filter( task => {
				return task.completed
			})
		},
		tasksNotCompleted(state, getters) {
			return getters.tasks.filter( task => {
				return task.completed === false
			})
		}
	}
}