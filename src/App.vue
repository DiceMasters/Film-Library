<template>
	<div class="wrapper">
		<Navbar/>
		<router-view/>
	</div>
</template>

<script>
	import Navbar from './components/Navbar'

	export default {
		components: { Navbar }
	}
</script>

<style lang="less">

</style>
