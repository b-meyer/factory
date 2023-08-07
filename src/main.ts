import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import { router } from '@/Scripts/Router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
router.isReady().then(() => { // Waiting for the router to be ready prevents race conditions when returning from a loginRedirect or acquireTokenRedirect
    app.mount('body');
});