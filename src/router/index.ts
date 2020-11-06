import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Prize from '../views/Prize.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Prize
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
