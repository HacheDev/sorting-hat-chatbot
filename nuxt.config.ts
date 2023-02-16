// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['assets/less/colors.less', 'assets/less/style.less', 'assets/less/mixins.less' ],
    vite:   {
        css: {
            preprocessorOptions:    {
                less:   {
                    additionalData: '@import "@/assets/less/colors.less";'
                }
            }
        }
    },
    modules:    [
        '@nuxt/content',
        '@nuxt/image-edge',
        '@nuxtjs/i18n'
    ],
    i18n: {    
        locales: ['en', 'es'],
        defaultLocale: 'en',
        vueI18n: {
            legacy: false,
                locale: 'en',
                messages: {
                en: {          
                    welcome: 'Welcome'
                },
                es: {
                    welcome: 'Bienvenido'
                }      
            }    
        }  
    }
})
