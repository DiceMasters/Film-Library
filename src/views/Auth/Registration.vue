<template>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<img src="../../assets/banner.jpg" class="img-fluid">
			</div>
			<div class="col-6">
				<h1 class="mb-4 mt-4">Registration</h1>
				<form @submit.prevent="submit()">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Email" v-model.trim="$v.email.$model" :class="{ 'is-invalid': $v.email.$error }">
						<small class="form-text text-danger error" v-if="!$v.email.required ">Email is required</small>
						<small class="form-text text-danger error" v-if="!$v.email.email">Email is incorrect</small>
					</div>
					<div class="form-group">
						<div class="input-group flex-nowrap" :class="{ error: $v.password.$error }">
							<div class="input-group-prepend" @click="checkPassword = !checkPassword">
								<span class="input-group-text"><font-awesome-icon :icon="(checkPassword) ? 'eye-slash' : 'eye'" /></span>
							</div>
							<input :type="(checkPassword) ? 'text' : 'password'" class="form-control" placeholder="Password" v-model.trim="$v.password.$model" :class="{ 'is-invalid': $v.password.$error }">
						</div>
						<small class="form-text text-danger error" v-if="!$v.password.required">Password is required</small>
						<small class="form-text text-danger error" v-if="!$v.password.minLength">Passwords must contain minimum 6 symbols</small>
					</div>
					<div class="form-group flex-nowrap">
						<input :type="(checkPassword) ? 'text' : 'password'" class="form-control" placeholder="Repeate password" v-model.trim="$v.repeatPassword.$model" :class="{ 'is-invalid': $v.repeatPassword.$error }">
						<small class="form-text text-danger error" v-if="!$v.repeatPassword.required">Please repeat your's password</small>
						<small class="form-text text-danger error" v-if="!$v.repeatPassword.sameAs">Passwords is not equal</small>
					</div>
					<div class="form-group">
						<button class="btn btn-primary" type="submit">
							{{ (loading) ? 'Loading' : 'Sign-Up' }}
						</button>
						<div class="alert alert-danger mt-3" role="alert" v-if="submitStatus.header === 'ERROR' && submitStatus.message === ''">
							Correct all errors
						</div>
						<div class="alert alert-danger mt-3" role="alert" v-if="submitStatus.message !== '' && submitStatus.header === 'ERROR'">
							{{ submitStatus.message }}
						</div>
					</div>
				</form>
				<div class="d-flex flex-column justify-content-center align-items-center">
					<p class="mt-4 mb-2">Do you have account?</p>
					<router-link :to="{ name: 'login' }" class="text-primary">Enter Here</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

	export default {
		data() {
			return {
				email: '',
				password: '',
				repeatPassword: '',
				checkPassword: false,
				submitStatus: {
					header: null,
					message: ''
				}
			}
		},
		validations: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(6)
			},
			repeatPassword: {
				required,
				sameAsPassword: sameAs('password')
			}
		},
		methods: {
			submit() {
				this.$v.$touch()

				if (this.$v.$invalid) {
					this.submitStatus.header = 'ERROR'
				} else {
					const user = {
						email: this.email,
						password: this.password
					}
					this.$store.dispatch('registerUser', user)
						.then( () => {
							this.submitStatus.header = 'OK'
							this.$router.push({ name: 'home' })
						})
						.catch( err => {
							this.submitStatus = {
								header: 'ERROR',
								message: err.message
							}
						})
				}
			}
		},
		computed: {
			loading() {
				return this.$store.getters.loading
			}
		}
	}
</script>

<style lang="less" scoped>
	.input-group-prepend {
		cursor: pointer;

		svg { width: 1.125em !important; }
	}

	small.text-danger {
		display: none !important;
	}

	input.form-control.is-invalid, .input-group.error {
		& ~ .error { display: block !important; }
	}
</style>