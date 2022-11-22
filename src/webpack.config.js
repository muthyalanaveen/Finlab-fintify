module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }

}

/*
  module: {
    rules: [
      // SCSS has different line endings than SASS
      // and needs a semicolon after the import.
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'sass-loader',
          'vuetify-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options2: {
              // This is the path to your variables
              data: "@import '@/assets/styles/scss/material-kit/_variables.scss';"
            },
            // Requires sass-loader@^8.0.0
            // options: {
            //   // This is the path to your variables
            //   prependData: "@import '@/styles/variables.scss';"
            // },
            // Requires sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss';"
            },
          },
        ],
      },
    ],
  },

*/
