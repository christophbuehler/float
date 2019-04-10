module.exports = {
  entry: ['./src/main.ts'],
  output: {
    filename: 'float.min.js',
    library: 'float',
    libraryExport: 'default',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['../node_modules']
            }
          }
        ]
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
    ],
  },
};