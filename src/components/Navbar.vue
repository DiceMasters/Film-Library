<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container">
			<router-link class="navbar-brand" :to="{ name: 'home' }">Film Library</router-link>
			<button class="navbar-toggler" type="button" @click="isCollapse = !isCollapse">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div :class="['collapse navbar-collapse', { 'show': isCollapse }]">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item" v-for="link in linkMenu" :key="link.name" @click="isCollapse = false">
						<router-link class="nav-link" :to="link.url">{{ link.name }}</router-link>
					</li>
					<li class="nav-item" v-if="checkUser">
						<span class="nav-link" @click="logout()">Logout</span>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false
			}
		},
		methods: {
			logout() {
				this.$store.dispatch('logoutUser')
				this.$router.push({ name: 'login' })
			}
		},
		computed: {
			checkUser() {
				return this.$store.getters.checkUser
			},
			linkMenu() {
				if (this.checkUser) {
					return [
						{ name: 'Home', url: '/' },
						{ name: 'Tasks', url: '/tasks' }
					]
				}
				return [
					{ name: 'Login', url: '/login' },
					{ name: 'Registration', url: '/registration' }
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	.navbar {
		.container {
			padding-left: 15px;
			padding-right: 15px;
		}
	}

	.nav-item {
		span { cursor: pointer; }
	}
</style>