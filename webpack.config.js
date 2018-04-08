module.exports = {
  entry: {
    'example1': './example1.js'
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