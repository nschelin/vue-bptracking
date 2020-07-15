<template>
	<div class="home">
		<v-container class="fill-height">
			<v-row>
				<v-col cols="6">
					<h2>Home</h2>
				</v-col>
				<transition name="slide-fade-down" mode="out-in">
					<v-col cols="6" v-if="isAuthenticated">
						<RecentItems heading="Recent Items" :max-items="5" :show-total="true" />
					</v-col>
				</transition>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import RecentItems from '@/components/RecentItems';
export default {
	name: 'Home',
	computed: {
		...mapState({
			isAuthenticated: state => state.isAuthenticated
		})
	},
	components: {
		RecentItems
	}
};
</script>
