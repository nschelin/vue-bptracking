<template>
    <div>
        <div>Chart</div>
        <canvas id="myChart" style="height: 100vh; width: 100vw;"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'Chart',
    props: {
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