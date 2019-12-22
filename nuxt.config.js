import axios from 'axios'
const dynamicRoutes = () => {
  return axios
    .get(
      'https://nodes.wavesnodes.com/addresses/data/3PAqH8JqgDUxkjLLbfHh56DyYcgYTGQhHcf?matches=.*?__user$'
    )
    .then((res) => {
      return res.data.map((contributor) => {
        return {
          route: `/contributors/${contributor.key.split('__')[0]}`,
          payload: contributor
        }
      })
    })
}
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Bolingo | Decentralized donation, charity and tipping app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3b8070' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/breadstick.client.js'],
  generate: {
    routes: dynamicRoutes
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
