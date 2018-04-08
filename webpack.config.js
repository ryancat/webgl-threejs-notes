module.exports = {
  entry: {
    'example': './example.js'
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },

  devServer: {
    publicPath: '/dist/'
  },

  mode: 'development'
}