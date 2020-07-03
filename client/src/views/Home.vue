<template>
	<div class="home">
		Home Content
		<LoginComponent v-if="!isAuthenticated" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import LoginComponent from '@/components/LoginComponent';

export default {
	name: 'Home',
	computed: {
		...mapState({
			isAuthenticated: state => state.isAuthenticated
		})
	},
	components: {
		LoginComponent
	}
};
</script>
