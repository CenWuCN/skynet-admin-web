<script lang="ts">
import { defineComponent } from "vue";

interface service {
    addr: string,
    cpu: string,
    message: number,
    mqlen: number,
    task: number
}

export default defineComponent({
    data() {
        return {
            serviceslist: [] as Array<service>
        }
    },
    created(){
        this.fetchData()
    },
    methods: {
        fetchData(){
            fetch("/debug/stat", {
                method: "POST",
                headers: {
                    'user-agent': 'Mozilla/4.0',
                    'content-type': 'application/json'
                },
            }).then((response) => {
                return response.json()
            }).then((myText) => {
                this.serviceslist = myText
            })
        }
    }
})
</script>

<template>
    <el-table :data="serviceslist"  :default-sort="{ prop: 'mqlen', order: 'descending' }">
        <el-table-column prop="addr" label="addr" sortable></el-table-column>
        <el-table-column prop="cpu" label="cpu" sortable></el-table-column>
        <el-table-column prop="message" label="message" sortable></el-table-column>
        <el-table-column prop="mqlen" label="mqlen" sortable></el-table-column>
        <el-table-column prop="task" label="task" sortable></el-table-column>
    </el-table>
</template>