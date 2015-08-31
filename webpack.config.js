var getConfig = require('hjs-webpack');

module.exports = getConfig({
	in: 'src/app.js',
	out: 'public',
	isDev: (process.env.NODE_ENV !== 'production')
});

// { entry: [ '/home/caleb/websites/Competitioner/src/app.js' ],
//   output: 
//    { path: '/home/caleb/websites/Competitioner/public/',
//      filename: 'competitioner.1.0.0.js',
//      cssFilename: 'competitioner.1.0.0.css',
//      hash: false,
//      publicPath: '/' },
//   resolve: { extensions: [ '', '.js', '.jsx', '.json' ] },
//   plugins: 
//    [ { config: 
//         { html: true,
//           isDev: false,
//           serveCustomHtmlInDev: true,
//      {},
//      { preferEntry: true },
//      { options: 
//         { compress: { warnings: false },
//           output: { comments: false },
//           sourceMap: false } },
//      { filename: 'competitioner.1.0.0.css',
//        options: { allChunks: true },
//        id: 1 },
//      { definitions: { 'process.env': { NODE_ENV: '"production"' } } } ],
//   module: 
//    { loaders: 
//       [ { test: /(\.js$)|(\.jsx$)/,
//           exclude: /node_modules/,
//           loaders: [ 'babel-loader' ] },
//         { test: /\.json$/, loaders: [ 'json' ] },
//         { test: /\.(otf|eot|svg|ttf|woff)/,
//           loader: 'url-loader?limit=10000' },
//         { test: /\.(jpe?g|png|gif)/, loader: 'url-loader?limit=10000' },
//         { test: /\.jade$/, loaders: [ 'jade' ] },
//         { test: /\.css$/,
//           loader: '/home/caleb/websites/Competitioner/node_modules/hjs-webpack/node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style-loader!css-loader!postcss-loader' },
//         { test: /\.styl$/,
//           loader: '/home/caleb/websites/Competitioner/node_modules/hjs-webpack/node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style-loader!css-loader!postcss-loader!stylus-loader' } ] },
//   stylus: { use: [ [Function] ] },
//   postcss: 
//    [ { [Function]
//        options: {},
//        process: [Function],
//        info: [Function],
//        postcssPlugin: 'autoprefixer',
//        postcssVersion: '4.1.16' } ],
//   spec: 
//    { in: 'src/app.js',
//      out: 'public',
//      isDev: false,
//      entry: '/home/caleb/websites/Competitioner/src/app.js',
//      output: 
//       { path: '/home/caleb/websites/Competitioner/public/',
//         filename: 'competitioner.1.0.0.js',
//         cssFilename: 'competitioner.1.0.0.css',
//         hash: false,
//         publicPath: '/' },
//      configFile: null,
//      replace: null,
//      port: 3000,
//      hostname: 'localhost',
//      html: true,
//      urlLoaderLimit: 10000,
//      clearBeforeBuild: false,
//      serveCustomHtmlInDev: true,
//      devServer: 
//       { info: false,
//         historyApiFallback: true,
//         hot: true,
//         contentBase: '/home/caleb/websites/Competitioner/public' } } }