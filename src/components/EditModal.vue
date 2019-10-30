<template>
	<div class="modal show fade" tabindex="-1" role="dialog" >
		<div class="modal-dialog" role="document">
			<form class="modal-content" @submit.prevent="">
				<div class="modal-header">
					<h5 class="modal-title">{{ editData.title }}</h5>
					<button type="button" class="close" aria-label="Close" @click="$emit('closeModal')">
						<span aria-hidden="true"><font-awesome-icon icon="times" /></span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<input type="text" class="form-control" :class="{ 'is-invalid': $v.editData.title.$error }" v-model.trim="$v.editData.title.$model" placeholder="Title">
						<small class="form-text text-danger error" v-if="!$v.editData.title.required">Title is required</small>
					</div>
					<div class="form-group">
						<textarea rows="4" class="form-control" :class="{ 'is-invalid': $v.editData.description.$error }" v-model.trim="$v.editData.description.$model" placeholder="Description"></textarea>
						<small class="form-text text-danger error" v-if="!$v.editData.description.required">Description is required</small>
					</div>
					<div class="form-group d-flex flex-wrap">
						<div class="form-check mr-4">
							<input type="radio" class="form-check-input" id="whatWatchFilm" name="whatWatch" value="Film" v-model="$v.editData.type.$model" checked>
							<label for="whatWatchFilm">Film</label>
						</div>
						<div class="form-check">
							<input type="radio" class="form-check-input" id="whatWatchSerial" name="whatWatch" value="Serial" v-model="$v.editData.type.$model">
							<label for="whatWatchSerial">Serial</label>
						</div>
						<small class="form-text text-danger error" v-if="!$v.editData.type.required">Type is required</small>
					</div>
					<div class="alert alert-success" role="alert" v-if="submitStatus === 'ERROR'">
						Form is incorrect, correct all errors.
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="$emit('closeModal')">Отмена</button>
					<button type="button" class="btn btn-primary" @click="saveTask()">Сохранить изменения</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { required } from 'vuelidate/lib/validators'

	export default {
		props: ['taskId', 'taskTitle', 'taskDescription', 'taskType'],
		data() {
			return {
				editData: {
					id: this.taskId,
					title: this.taskTitle,
					description: this.taskDescription,
					type: this.taskType
				},
				submitStatus: null
			}
		},
		methods: {
			saveTask() {
				this.$v.$touch()

				if (this.$v.$invalid) {
					this.submitStatus = 'ERROR'
				} else {
					this.$store.dispatch('editTask', {
						id: this.editData.id,
						title: this.editData.title,
						description: this.editData.description,
						type: this.editData.type
					})

					this.$v.$reset()
					this.submitStatus = 'OK'
					this.$emit('closeModal')
				}
			}
		},
		validations: {
			editData: {
				title: { required },
				description: { required },
				type: { required }
			}
		}
	}
</script>

<style lang="less" scoped>
	.modal {
		display: block !important;
		background-color: rgba(0,0,0,.75);
	}

	small.text-danger {
		display: none !important;
	}

	.form-control.is-invalid, .input-group.error {
		& ~ .error { display: block !important; }
	}
</style>