<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 class="mb-4 mt-4">Home</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<Create/>
			</div>
		</div>
	</div>
</template>

<script>
	import Create from './../components/Create'

	export default {
		name: 'home',
		components: { Create }
	}
</script>

<style lang="less" scoped>
	
</style>
