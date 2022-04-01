<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ElNotification } from "element-plus"
import { wsaddr } from "../setting";

let ws: WebSocket

export default defineComponent({
    data(){
        return {
            logText: ""
        }
    },
    unmounted(){
        ws.close()
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            ws = new WebSocket(wsaddr + "/debug/log")

            ws.onmessage = (event) => {
                console.log(this.logText)
                this.logText += event.data
            }
            ws.onerror = (event) => {
                ws.close()
            }
        },
        sendMessage() {
            fetch("/debug/sendmessage").then((response) => {
                return response.text()
            }).then((text) => {
                ElNotification({
                    title: '',
                    message: '发送成功',
                    duration: 2000,
                })
            })
        },
        clearlogData(){
            this.logText =""
        }
    },
})
</script>

<template>
    <el-row :gutter="20">
        <el-col :span="2">
            <el-button size="mini" type="primary" v-on:click="clearlogData">清空日志框</el-button>
        </el-col>
        <el-col :span="1" :offset="1">
            <el-button size="mini" type="primary" v-on:click="sendMessage">发送消息</el-button>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="20" class="logbox">
            <el-scrollbar>
               <p v-text="logText"></p>
            </el-scrollbar>
        </el-col>

    </el-row>
</template>

<style scoped>
.logbox {
    background-color: lightgray;
    height: 80vh;
    white-space: pre-wrap;
    margin-top: 2vh;
}
</style>