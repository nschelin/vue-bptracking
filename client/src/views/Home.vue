<template>
	<div class="home">
		<div>
			<h3>Temp Login Test</h3>
		</div>
		<div>
			<input type="text" v-model="email" />
		</div>
		<div>
			<input type="password" v-model="password" />
		</div>
		<button type="button" @click="login">Login</button>
	</div>
</template>

<script>
import { loginService } from '@/services';

export default {
	name: 'Home',
	data: () => ({
		email: '',
		password: ''
	}),
	methods: {
		async login() {
			const resp = await loginService.login(this.email, this.password);
			console.log(resp);
		}
	},
	components: {}
};
</script>

<style lang="scss">
.home {
	margin-left: 20px;
	margin-top: 15px;
	div {
		padding: 5px;
	}
	button {
		margin-left: 120px;
		padding: 5px;
		border: 1px solid black;
		border-radius: 5px;
		background-color: lime;
	}
}
input[type='text'],
input[type='password'] {
	border: 1px solid black;
	border-radius: 3px;
}
</style>
