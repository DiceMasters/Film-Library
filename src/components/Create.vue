<template>
	<div class="wrapper">
		<form v-on:submit.prevent="submitTask()" class="mb-5">
			<div class="form-group">
				<input type="text" class="form-control" :class="{ 'is-invalid': $v.newTask.title.$error }" v-model.trim="$v.newTask.title.$model" placeholder="Title">
				<small class="form-text text-danger error" v-if="!$v.newTask.title.required">Title is required</small>
			</div>
			<div class="form-group">
				<textarea rows="4" class="form-control" :class="{ 'is-invalid': $v.newTask.description.$error }" v-model.trim="$v.newTask.description.$model" placeholder="Description"></textarea>
				<small class="form-text text-danger error" v-if="!$v.newTask.description.required">Description is required</small>
			</div>
			<div class="form-group d-flex flex-wrap">
				<div class="form-check">
					<input type="radio" class="form-check-input" id="whatWatchFilm" name="whatWatch" value="Film" v-model="newTask.type" checked>
					<label for="whatWatchFilm">Film</label>
				</div>
				<div class="form-check">
					<input type="radio" class="form-check-input" id="whatWatchSerial" name="whatWatch" value="Serial" v-model="newTask.type">
					<label for="whatWatchSerial">Serial</label>
				</div>
			</div>
			<div class="form-group">
				<button class="btn btn-primary" type="submit" :disabled="submitStatus === 'PENDING'">Create task</button>
			</div>
			<div class="alert alert-success" role="alert" v-if="submitStatus === 'ERROR'">
				Form is incorrect, correct all errors.
			</div>
			<div class="alert alert-success" role="alert" v-if="submitStatus === 'OK'">
				Task succesfully created!!! <router-link class="alert-link" :to="{ name: 'tasks' }">Check it now.</router-link>
			</div>
		</form>
	</div>
</template>

<script>
	import { required } from 'vuelidate/lib/validators'

	export default {
		data() {
			return {
				newTask: {
					id: 3,
					title: '',
					description: '',
					type: 'Film',
					completed: false,
					editing: false
				},
				submitStatus: null
			}
		},
		validations: {
			newTask: {
				title: { required },
				description: { required }
			}
		},
		methods: {
			submitTask() {
				this.$v.$touch()

				if (this.$v.$invalid) {
					this.submitStatus = 'ERROR'
				} else {
					const task = {
						id: this.newTask.id,
						title: this.newTask.title,
						description: this.newTask.description,
						type: this.newTask.type,
						completed: this.newTask.completed,
						editing: this.newTask.editing,
					}

					this.$store.dispatch('newTask', task)

					this.$v.$reset()

					this.newTask.title = ''
					this.newTask.description = ''

					this.submitStatus = 'OK'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.form-group {
		.form-check {
			&:not(:last-child) {
				margin-right: 20px;
			}
		}
	}

	small.text-danger {
		display: none !important;
	}

	.form-control.is-invalid, .input-group.error {
		& ~ .error { display: block !important; }
	}
</style>