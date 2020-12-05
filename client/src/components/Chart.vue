<template>
    <div>
        <div v-if="showTitle">{{chartTitle}}</div>
        <canvas id="myChart" style="height: 100vh; width: 100vw;"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'Chart',
    props: {
        chartTitle: {
            type: String,
            default: 'Chart Title'
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        config: {
            type: Object,
            required: true
        },
        data: Array
    },
    data: () => ({
        chart: null
    }),
    watch: {
        data(newVal) {
            this.chart.data = newVal;
        }
    },
    async mounted() {
        const ctx = document.getElementById('myChart');
        this.chart = new Chart(ctx, this.config);
    }
}
</script>
<style lang="scss"></style>