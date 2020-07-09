<template>
    <div class="charts">
        <div id="c1"></div>
        <div id="c2"></div>
    </div>
</template>

<script>
    export default {
        name: "page2",
        data(){
            return{
                chart: null,
                data: [
                    { genre: "Sports", sold: 275 },
                    { genre: "Strategy", sold: 115 },
                    { genre: "Action", sold: 120 },
                    { genre: "Shooter", sold: 350 },
                    { genre: "Other", sold: 150 }
                ],
                zhexian: [
                    { type: '未知', value: 654, percent: 0.02 },
                    { type: '17 岁以下', value: 654, percent: 0.02 },
                    { type: '18-24 岁', value: 4400, percent: 0.2 },
                    { type: '25-29 岁', value: 5300, percent: 0.24 },
                    { type: '30-39 岁', value: 6200, percent: 0.28 },
                    { type: '40-49 岁', value: 3300, percent: 0.14 },
                    { type: '50 岁以上', value: 1500, percent: 0.06 },
                ]
            }
        },
        mounted() {
            this.initComponent();
            this.initzhexian();
        },
        methods: {
            initComponent() {
                const chart = new this.$G2.Chart({
                    container: "c1",
                    autoFit: true,
                    height: 400,
                    padding: [20, 100],
                });
                chart.source(this.data);
                chart
                    .interval()
                    .position("genre*sold")
                    .color("genre");
                this.chart = chart;
                this.chart.render();
            },
            initzhexian() {
                const chart = new this.$G2.Chart({
                    container: 'c2',
                    autoFit: true,
                    height: 400,
                    padding: [20, 100],
                });
                chart.data(this.zhexian);
                chart.scale('value', {
                    alias: '销售额(万)',
                });
                chart.axis('type', {
                    tickLine: {
                        alignTick: false,
                    },
                });
                chart.axis('value', false);
                chart.tooltip({
                    showMarkers: false,
                });
                chart.interval().position('type*value');
                chart.interaction('element-active');
                this.zhexian.forEach((item) => {
                    chart
                        .annotation()
                        .text({
                            position: [item.type, item.value],
                            content: item.value,
                            style: {
                                textAlign: 'center',
                            },
                            offsetY: -30,
                        })
                        .text({
                            position: [item.type, item.value],
                            content: (item.percent * 100).toFixed(0) + '%',
                            style: {
                                textAlign: 'center',
                            },
                            offsetY: -12,
                        });
                });
                chart.render();
            }
        }
    }
</script>

<style scoped>
    .charts{
        width: 80%;
    }
</style>
