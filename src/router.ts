import { createRouter, createWebHistory } from "vue-router"

const servicesmem = () => import("./components/services-mem.vue")
const servicesstat = () => import("./components/services-stat.vue")
const hostinfo = () => import("./components/host-info.vue")
const serviceslog = () => import("./components/services-log.vue")

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: "/servicesmem", component: servicesmem },
        { path: "/servicesstat", component: servicesstat },
        { path: "/hostinfo", component: hostinfo },
        { path: "/serviceslog", component: serviceslog }
    ],
})

export default router