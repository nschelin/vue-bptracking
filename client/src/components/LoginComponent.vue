<template>
	<div>
		<v-form ref="loginForm" v-model="valid" @submit.prevent="submit">
			<v-card>
				<v-card-title>
					Login
				</v-card-title>
				<v-card-text>
					<v-text-field label="Email" v-model="email" required></v-text-field>
					<v-text-field label="Password" v-model="password" required type="password"></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="cancel">Cancel</v-btn>
					<v-btn type="submit" :disabled="!valid">Login</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data: () => ({
		valid: true,
		email: '',
		password: ''
	}),
	methods: {
		submit() {
			if (this.$refs.loginForm.validate()) {
				const creds = { email: this.email, password: this.password };
				if (this.$store.dispatch('login', creds)) {
					this.email = this.password = '';
					this.$refs.loginForm.reset();
					this.$emit('close', null);
				}
			}
		},
		cancel() {
			this.$emit('close', null);
			this.email = this.password = '';
			this.$refs.loginForm.reset();
		}
	}
};
</script>

<style lang="scss" scoped></style>
