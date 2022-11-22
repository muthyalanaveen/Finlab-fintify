const path = require('path')
const { defaultTo } = require('lodash')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const optiturnId = defaultTo(process.env.VUE_APP_OPTITURN_ID, 'Modrno')
const brandDistDir = defaultTo(process.env.BRAND_DIST_DIR, 'dist')
const title = defaultTo(process.env.VUE_APP_TITLE, 'Modrno Returns')

module.exports = {
  outputDir: path.resolve(__dirname, `${brandDistDir}`),
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        branding: path.resolve(__dirname, `./src/branding/`)
      }
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, `./src/branding/assets/images/fav.png`)
      }])
    ]
  }
}
