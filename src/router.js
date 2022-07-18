import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Comic from "./views/Comic.vue";
import Character from "./views/Character.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/comics/:id", component: Comic },
    { path: "/characters/:id", component: Character },
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;