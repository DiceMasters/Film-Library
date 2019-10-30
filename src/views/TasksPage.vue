<template>
	<div class="container">
		<div class="row">
			<div class="col d-flex flex-wrap justify-content-between align-items-center">
				<h1 class="mb-4 mt-4">Tasks</h1>
				<div class="btn-group">
					<button class="btn btn-secondary" :class="{ 'active': filter == 'all' }" type="button" @click="filter = 'all'">All</button>
					<button class="btn btn-secondary" :class="{ 'active': filter == 'completed' }" type="button" @click="filter = 'completed'">Completed</button>
					<button class="btn btn-secondary" :class="{ 'active': filter == 'active' }" type="button" @click="filter = 'active'">Not Completed</button>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="list-group">
					<transition-group class="list-group" name="list-group" tag="div">
						<div class="list-group-item" v-for="task in tasks" :key="task.id" :class="{ 'completed': task.completed }">
							<div class="d-flex w-100 justify-content-between">
								<div class="d-flex align-items-center mb-1">
									<input class="mr-2" type="checkbox" @click="completeTask(task.id, task.completed)" :checked="task.completed" title="Complete Task">
									<h5 class="mb-0">{{ task.title }}</h5>
								</div>
								<div class="task_tools">
									<small @click="task.editing = !task.editing" title="Edit Task"><font-awesome-icon icon="pencil-alt" /></small>
									<small @click="deleteTask(task.id)" title="Remove Task"><font-awesome-icon icon="times" /></small>
								</div>
							</div>
							<p class="mb-1">{{ task.description.substring(0, 100).trim() + '...' }}</p>
							<span class="badge badge-secondary mb-3">{{ task.type }}</span>
							<EditModal 
								:taskId="task.id"
								:taskTitle="task.title"
								:taskDescription="task.description"
								:taskType="task.type"
								:key="task.id" 
								v-if="task.editing" 
								@closeModal="task.editing = !task.editing"
							/>
						</div>
					</transition-group>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import EditModal from './../components/EditModal'

	export default {
		components: { EditModal },
		data() {
			return {
				filter: 'all'
			}
		},
		methods: {
			completeTask(id, completed) {
				this.$store.dispatch('completeTask', {
					id: id,
					completed: !completed
				})
				this.$store.dispatch('loadTasks')
			},
			deleteTask(id) {
				this.$store.dispatch('deleteTask', id)
				this.$store.dispatch('loadTasks')
			}
		},
		computed: {
			tasks() {
				switch ( this.filter ) {
					case 'active':
						return this.$store.getters.tasksNotCompleted
						break
					case 'completed':
						return this.$store.getters.tasksCompleted
						break
					case 'all':
						return this.$store.getters.tasks
						break
					default:
						return this.$store.getters.tasks
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.task {
		&_tools {
			display: flex;
			& > small:not(:last-child) {
				margin-right: 15px;
			}
		}
	}

	.list-group-item.completed {
		h5 {
			color: lightgray;
			text-decoration: line-through;
		}
	}

	small svg,
	input[type="checkbox"] { cursor: pointer; }

	.list-group {
		&-enter {
			&-active {
				opacity: 0;
				transition: all .5s;
				transform: translateY(-30px);
			}

			&-to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		&-leave {
			&-active {
				opacity: 1;
				transition: all .5s;
			}

			&-to {
				opacity: 0;
				transform: translateY(30px);
			}
		}
	}

</style>