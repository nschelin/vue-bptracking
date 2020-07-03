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
		<svg id="barChart" width="500" height="500"></svg>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { format, parseISO } from 'date-fns';
import * as d3 from 'd3';

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
		],
		chart: null
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
		await this.$store.dispatch('getRecent', this.maxItems);
		const svg = d3.select('#barChart');
		const margin = 200,
			width = svg.attr('width') - margin,
			height = svg.attr('height') - margin;

		const xScale = d3
			.scaleBand()
			.range([0, width])
			.padding(0.4);
		const yScale = d3.scaleLinear().range([height, 0]);

		const g = svg.append('g').attr('transform', 'translate(100,100)');

		xScale.domain(this.recentBpItems.map(d => d.systolic));
		yScale.domain([0, d3.max(this.recentBpItems, d => d.systolic)]);
		g.append('g')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(xScale));

		g.append('g').call(
			d3
				.axisLeft(yScale)
				.tickFormat(d => `${d}`)
				.ticks(5)
		);

		g.selectAll('.bar')
			.data(this.recentBpItems)
			.enter()
			.append('rect')
			.attr('class', d => {
				const val = d.systolic;
				if (val <= 129) {
					return 'bar normal';
				} else if (val < 139 && val > 129) {
					return 'bar stage-1-high';
				} else {
					return 'bar stage-2-high';
				}
			})
			.attr('x', d => xScale(d.systolic))
			.attr('y', d => yScale(d.systolic))
			.attr('width', xScale.bandwidth())
			.attr('height', d => height - yScale(d.systolic));
	}
};
</script>

<style lang="scss">
.bar {
	&.normal {
		fill: #4caf50;
	}
	&.stage-1-high {
		fill: #ff9800;
	}
	&.stage-2-high {
		fill: #f44336;
	}
}
</style>
