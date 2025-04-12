import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createNaiveUI } from './plugins/naive'

const app = createApp(App)

app.use(createNaiveUI())
app.use(router);
app.mount('#app')
