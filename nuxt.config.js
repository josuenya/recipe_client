export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'receipe-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vee-validate.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/i18n',
  ],
  i18n: {
    langDir: '~/locales/',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json'
      }
    ],
    // lazy: true,
    defaultLocale: 'fr',
    vueI18n: {
      fallbackLocale: 'fr',
      messages: {
        en: require('./locales/en.json'),
        fr: require('./locales/fr.json')
      }
    }
  },


  toast: {
    position: 'bottom-left',
    register: [ // Register custom toasts
    {
      name: 'my-error',
      message: 'Oops...Something went wrong',
      options: {
        type: 'error'
      },
    }
    ],
    duration : 5000
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },
  auth: {
    // watchLoggedIn: false,
    redirect: {
      home: "/",
      login: '/login',
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          maxAge: 30 * 24 * 60 * 60 * 1000,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: '',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: "access_token" },
          logout: false,
          user: { url: '/profile', method: 'get' },
        },
        autoLogout: true
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  }
}
