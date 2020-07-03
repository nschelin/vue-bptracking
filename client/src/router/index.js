import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/bp',
		name: 'BloodPressure',
		meta: {
			requiresAuth: true
		},
		component: () => import(/* webpackChunkName: "bp" */ '../views/BloodPressure.vue')
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requiresAuth) && !store.getters.isAuthenticated) {
		next({ name: 'Home' });
	} else {
		next();
	}
});
export default router;
