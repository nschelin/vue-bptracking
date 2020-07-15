<template>
	<div class="blood-pressure">
		<v-container>
			<v-row>
				<v-col cols="6">
					<v-card flat>
						<v-toolbar flat>
							<v-toolbar-title>
								<h2>Blood Pressure</h2>
							</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</v-toolbar>
						<v-card-text>
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
									<v-chip label class="white--text" :color="getColor(item.diastolic, 'dia')">{{
										item.diastolic
									}}</v-chip>
								</template>
								<template #item.bpm="{ item }">
									<v-chip label class="white--text" :color="getColor(item.bpm, 'bpm')">{{ item.bpm }}</v-chip>
								</template>
							</v-data-table>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="6">
					<h2>Stats</h2>
				</v-col>
			</v-row>

			<v-dialog v-model="dialog" width="600px" persistent>
				<AddEditBpItem @close="close" />
			</v-dialog>
		</v-container>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { formatDate, getColor } from '@/util';

import AddEditBpItem from '@/components/AddEditBpItem';

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
		loading: true,
		dialog: false
	}),
	computed: {
		...mapState({
			bpItems: state => state.bpItems,
			totalItems: state => state.totalItems
		})
	},
	methods: {
		formatDate,
		getColor,
		close() {
			this.dialog = false;
		}
	},
	watch: {
		options: {
			// eslint-disable-next-line
			async handler(opts, oldOpts) {
				// only update if there was an older value
				if (oldOpts.page) {
					this.loading = true;
					const { page, sortBy, sortDesc } = opts;
					const sortField = sortBy.length > 0 ? sortBy[0] : 'modified';
					const sortDir = sortDesc.length > 0 ? (sortDesc[0] == true ? 'desc' : 'asc') : 'desc';

					await this.$store.dispatch('getBpItems', { page, sortField, sortDir });
					this.loading = false;
				}
			},
			deep: true
		}
	},
	async created() {
		await this.$store.dispatch('getBpItems', { page: 1, sortField: 'modified', sortDir: 'desc' });
		this.loading = false;
	},
	mounted() {
		const { newItem } = this.$route.params;
		if (newItem) {
			this.dialog = true;
		}
	},
	components: {
		AddEditBpItem
	}
};
</script>

<style lang="scss" scoped></style>
