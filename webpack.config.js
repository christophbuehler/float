module.exports = {
  entry: ['./src/main.scss', './src/main.ts'],
  output: {
    filename: 'floater.min.js',
    library: 'floater',
  },
  module: {
    rules: [
      {
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
