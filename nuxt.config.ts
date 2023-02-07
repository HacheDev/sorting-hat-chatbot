// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['assets/less/colors.less', 'assets/less/style.less' ],
    vite:   {
        css: {
            preprocessorOptions:    {
                less:   {
                    additionalData: '@import "@/assets/less/colors.less";'
                }
            }
        }
    }
})
