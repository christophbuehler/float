module.exports = [{
  entry: './src/main.ts',
  output: {
    filename: 'float.min.js',
    library: 'float',
    libraryExport: 'default',
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
    }],
  },
}, {
  entry: './src/helpers/index.ts',
  output: {
    filename: 'floaters.min.js',
    library: 'floaters',
    libraryExport: 'default',
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
    }],
  },
}];