<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from 'echarts';
import { postheader, wsaddr } from "../setting"

interface info {
    cpu_model: string,
    total_mem: string
}


type EChartsOption = echarts.EChartsOption;

type serverdata = [number, number, number]

let source: Array<serverdata> = []
let ws: WebSocket

function fixedNumber(num: number): string {
    if (num < 10) {
        return "0" + num.toString()
    }
    else {
        return num.toString()
    }
}

function fixedStr(str: string, num: number) {
    let strlen = str.length
    if (strlen < num) {
        let space: string = ""
        for (let i = 0; i < num - strlen; i++) {
            space += "&nbsp"
        }
        return space
    }
    return ""
}

var myChart: echarts.ECharts
var option: EChartsOption

export default defineComponent({
    data() {
        return {
            hostinfo: {
                cpu_model: "",
                total_mem: ""
            } as info
        }
    },
    unmounted() {
        source = []
        ws.close()
    },
    mounted() {
        this.fetchData()
        this.fetchHostInfo()
        var chartDom = document.getElementById('percentagechart')!;
        myChart = echarts.init(chartDom);

        option = {
            title: {
                text: "System Info"
            },
            legend: {
                icon: "rect"
            },
            xAxis: {
                type: "time",
            },
            yAxis: {
                type: "value",
                max: 100,
                min: 0,
                interval: 10,
                axisLabel: {
                    formatter: "{value}%"
                }
            },
            tooltip: {
                trigger: "axis",
                formatter: function (pramas: any) {
                    let str: string = ""
                    pramas.forEach((element: any, index: number) => {
                        if (index == 0) {
                            let xAxisDate: Date = new Date(element.axisValue)
                            str += fixedNumber(xAxisDate.getHours()) + ":" + fixedNumber(xAxisDate.getMinutes()) + ":" + fixedNumber(xAxisDate.getSeconds()) + "<br />"
                        }
                        str += element.marker + element.seriesName + fixedStr(element.seriesName, 10) + element.data[index + 1] + "%</span><br />"
                    });
                    return str
                },
                textStyle: {
                    fontFamily: "Consolas"
                }
            },
            dataset: {
                dimensions: ["time", "cpu", "mem"],
                source: source,
            },
            series: [
                {
                    name: "cpu",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    encode: {
                        x: "time",
                        y: "cpu"
                    },
                    color: ["#516b91"],
                },
                {
                    name: "mem",
                    type: "line",
                    symbol: "none",
                    encode: {
                        x: "time",
                        y: "mem"
                    },
                    color: ["#59c4e6"]
                },
            ]
        };

        myChart.setOption(option);

        this.init()
    },
    methods: {
        fetchData() {
            fetch("/debug/infolist", postheader).then((response) => {
                return response.json()
            }).then((jd) => {
                source = jd as Array<serverdata>
                (option.dataset as echarts.DatasetComponentOption).source = source
                myChart.setOption(option)
            })
        },
        fetchHostInfo() {
            fetch("/debug/hostinfo", postheader).then((response) => {
                return response.json()
            }).then((jsonData) => {
                this.hostinfo = jsonData
            })
        },
        init() {
            ws = new WebSocket(wsaddr + "/debug/cpu")
            ws.onmessage = (event) => {
                let array = JSON.parse(event.data)
                source.push(array)
                if (source.length > 120) {
                    source.shift()
                }

                myChart.setOption(option);
            }
            ws.onerror = (event) => {
                ws.close()
            }
        }

    }

})
</script>

<template>
    <el-descriptions title="Host" :column="1">
        <el-descriptions-item label="CPU">{{ hostinfo.cpu_model }}</el-descriptions-item>
        <el-descriptions-item label="Mem">{{ hostinfo.total_mem }}</el-descriptions-item>
    </el-descriptions>
    <div id="percentagechart"></div>
</template>

<style scoped>
#percentagechart {
    height: 600px;
    width: 1000px;
}
</style>