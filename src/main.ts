import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/scripts/router';
import App from '@/layout/App.vue';
const app = createApp(App);
app.use(createPinia());
app.use(router);
router.isReady().then(() => app.mount('body'));