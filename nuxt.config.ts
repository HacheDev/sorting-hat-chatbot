// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    css: [ 'assets/less/main.less', 'assets/less/mixins.less' ],
    vite:   {
        css: {
            preprocessorOptions:    {
                less:   {
                    additionalData: '@import "@/assets/less/variables.less";@import "@/assets/less/mixins.less";'
                }
            }
        }
    },
    modules:    [
        '@nuxt/content',
        '@nuxtjs/i18n'
    ],
    i18n: {    
        locales: ['en', 'es'],
        defaultLocale: 'en',
        detectBrowserLanguage:  {
            useCookie: true,
            alwaysRedirect: true
        },
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
