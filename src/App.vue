<script lang="ts">
import { defineComponent } from "vue";
import { List, Coin, TrendCharts, Cpu, Printer } from "@element-plus/icons-vue"

export default defineComponent({
    components: {
        List,
        Coin,
        TrendCharts,
        Cpu,
        Printer
    },
})
</script>

<template>
    <el-row :gutter="40" class="tac">
        <el-col :offset="5" :span="3">
            <h5>Skynet Admin</h5>
            <el-menu default-active="/hostinfo" class="el-menu-vertical" :router="true">
                <el-menu-item index="/hostinfo">
                    <el-icon>
                        <trend-charts />
                    </el-icon>
                    <span>Info</span>
                </el-menu-item>
                <el-menu-item index="/servicesmem">
                    <el-icon>
                        <coin />
                    </el-icon>
                    <span>Mem</span>
                </el-menu-item>
                <el-menu-item index="/servicesstat">
                    <el-icon>
                        <cpu />
                    </el-icon>
                    <span>Stat</span>
                </el-menu-item>
                <el-menu-item index="/serviceslog">
                    <el-icon>
                        <printer />
                    </el-icon>
                    <span>Log</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="12" class="content">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<style scoped>
.content {
    margin-top: 3vh;
}
</style>