import DefaultTheme from "vitepress/theme";
import se from "selab-ui";
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.use(se)
        ctx.app.component('demo-preview', AntDesignContainer)
    }
}
