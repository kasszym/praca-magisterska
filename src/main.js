import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import ElementPlus from "element-plus";
import pl from "element-plus/dist/locale/pl.mjs";
import "element-plus/dist/index.css";
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, { locale: pl })
app.mount('#app')