import { createApp } from 'vue';
import { Button } from 'ant-design-vue';
import App from './App.vue';
import router from '@/router/index';
import 'ant-design-vue/dist/antd.less';

const app = createApp(App);

app.use(router);
app.use(Button);
app.mount('#app');
