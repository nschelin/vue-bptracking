<template>
	<div class="home">
		<v-container>
			<v-row>
				<v-col>
					<h2>Home</h2>
				</v-col>
				<transition name="slide-fade" mode="out-in">
					<v-col v-if="isAuthenticated">
						<RecentItems heading="Recent Items" :max-items="10" :show-total="true" />
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
<style lange="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s;
}
.slide-fade-enter,
.slide-fade-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}
</style>
