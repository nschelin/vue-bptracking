<template>
	<div>
		<h2>
			{{ heading }} <template v-if="showTotal">({{ recentBpItems.length }})</template>
		</h2>
		<v-data-table :headers="headers" :items="recentBpItems" hide-default-footer disable-pagination>
			<template #item.date="{ item }">
				{{ format(item.date) }}
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
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { format, parseISO } from 'date-fns';

export default {
	name: 'RecentItems',
	props: {
		heading: String,
		showTotal: Boolean,
		maxItems: {
			type: Number,
			default: 3,
			validator: function(val) {
				return val > 0;
			}
		}
	},
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
			recentBpItems: state => state.recentBpItems
		})
	},
	methods: {
		format(date) {
			return date ? format(parseISO(date), 'MM/dd/yyyy') : '';
		},
		getColor(val, type) {
			switch (type) {
				case 'sys':
					if (val <= 129) return 'green';
					else if (val < 139 && val > 129) return 'orange';
					else return 'red';
				case 'dia':
					if (val <= 80) return 'green';
					else if (val < 89 && val > 80) return 'orange';
					else return 'red';

				case 'bpm':
					if (val > 60 && val <= 100) return 'green';
					else return 'orange';
				default:
					break;
			}
		}
	},
	async created() {
		console.log(this.maxItems);
		await this.$store.dispatch('getRecent', this.maxItems);
	}
};
</script>

<style lang="scss" scoped></style>
