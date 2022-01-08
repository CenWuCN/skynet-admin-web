<script lang="ts">
import { defineComponent } from "vue";

interface service {
    addr: string,
    mem: string,
    type: string,
    service: string,
    agrs: string
}

export default defineComponent({
    data() {
        return {
            memlist: [] as Array<service>
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            fetch("/debug/mem", {
                method: "POST",
                headers: {
                    'user-agent': 'Mozilla/4.0',
                    'content-type': 'application/json'
                },
            }).then((response) => {
                return response.json()
            }).then((myText) => {
                this.memlist = myText
            })
        }
    },
})
</script>

<template>
    <el-table :data="memlist" :default-sort="{ prop: 'mem', order: 'descending' }">
        <el-table-column prop="addr" label="addr" sortable></el-table-column>
        <el-table-column prop="mem" label="mem" sortable></el-table-column>
        <el-table-column prop="type" label="type"></el-table-column>
        <el-table-column prop="service" label="service"></el-table-column>
        <el-table-column prop="args" label="args"></el-table-column>
    </el-table>
</template>