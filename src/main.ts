import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/Scripts/Router';
import App from '@/Views/App/Layout.vue';
const app = createApp(App);
app.use(createPinia());
app.use(router);
router.isReady().then(() => app.mount('body'));