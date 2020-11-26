<template>
	<div>
		<v-form ref="loginForm" v-model="valid" @submit.prevent="submit">
			<v-card>
				<v-card-title>
					Login
				</v-card-title>
				<v-card-text>
					<v-text-field label="Email" v-model="email" required autofocus></v-text-field>
					<v-text-field label="Password" v-model="password" required type="password"></v-text-field>
					<v-alert type="error" :hidden="!errors">
						There was an error. Please try again.
					</v-alert>
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
import { mapState } from 'vuex';

export default {
	name: 'Login',
	data: () => ({
		valid: true,
		email: '',
		password: '',
		errors: false
	}),
	computed: {
		...mapState({
			isAuthenticated: state => state.isAuthenticated
		})
	},
	methods: {
		async submit() {
			if (this.$refs.loginForm.validate()) {
				this.errors = false;
				const creds = { email: this.email, password: this.password };
				await this.$store.dispatch('login', creds);
				if(this.isAuthenticated) {
					this.reset();
				}
				else {
					this.errors = true;
				}

			}
		},
		cancel() {
			this.$emit('close', null);
			this.reset();
		},
		reset() {
			this.email = this.password = '';
			this.errors = false;
			this.$refs.loginForm.reset();
		}
	}
};
</script>

<style lang="scss" scoped></style>
