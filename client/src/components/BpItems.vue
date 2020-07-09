<template>
	<div class="blood-pressure">
		<v-container>
			<v-row>
				<v-col cols="6">
					<h2>Blood Pressure</h2>
					<v-data-table :headers="headers" :items="bpItems">
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
		]
	}),
	computed: {
		...mapState({
			bpItems: state => state.bpItems
		})
	},
	methods: {
		formatDate,
		getColor
	},
	async created() {
		await this.$store.dispatch('getBpItems');
	}
};
</script>

<style lang="scss" scoped></style>
