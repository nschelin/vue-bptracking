<template>
	<div class="blood-pressure">
		<v-container>
			<v-row>
				<v-col cols="6">
					<h2>Blood Pressure</h2>
					<v-data-table
						:headers="headers"
						:items="bpItems"
						:server-items-length="totalItems"
						:loading="loading"
						:options.sync="options"
					>
						<template #item.date="{ item }">
							{{ formatDate(item.date) }}
						</template>
						<template #item.systolic="{ item }">
							<v-chip label class="white--text" :color="getColor(item.systolic, 'sys')">{{ item.systolic }}</v-chip>
						</template>
						<template #item.diastolic="{ item }">
							<v-chip label class="white--text" :color="getColor(item.diastolic, 'dia')">{{ item.diastolic }}</v-chip>
						</template>
						<template #item.bpm="{ item }">
							<v-chip label class="white--text" :color="getColor(item.bpm, 'bpm')">{{ item.bpm }}</v-chip>
						</template>
					</v-data-table>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { formatDate, getColor } from '@/util';

export default {
	name: 'BpItems',
	data: () => ({
		headers: [
			{
				text: 'Date',
				align: 'start',
				sortable: true,
				value: 'date'
			},
			{
				text: 'Systolic',
				sortable: true,
				value: 'systolic'
			},
			{
				text: 'Diastolic',
				sortable: true,
				value: 'diastolic'
			},
			{
				text: 'Beats Per Minute (BPM)',
				sortable: true,
				value: 'bpm'
			}
		],
		options: {},
		loading: false
	}),
	computed: {
		...mapState({
			bpItems: state => state.bpItems,
			totalItems: state => state.totalItems
		})
	},
	methods: {
		formatDate,
		getColor
	},
	watch: {
		options: {
			// eslint-disable-next-line
			async handler(opts, oldOpts) {
				if (oldOpts.page) {
					const { page, sortBy, sortDesc } = opts;
					const sortField = sortBy.length > 0 ? sortBy[0] : 'modified';
					const sortDir = sortDesc.length > 0 ? (sortDesc[0] == true ? 'desc' : 'asc') : 'desc';
					console.log(sortField, sortDir);
					await this.$store.dispatch('getBpItems', { page, sortField, sortDir });
				}
			},
			deep: true
		}
	},
	async created() {
		await this.$store.dispatch('getBpItems', { page: 1, sortField: 'modified', sortDir: 'desc' });
	}
};
</script>

<style lang="scss" scoped></style>
