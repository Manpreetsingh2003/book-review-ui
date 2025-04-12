import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BookDetails from '../pages/BookDetails.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/book/:slug', component: BookDetails },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
