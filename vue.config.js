const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

let configureWebpack = {
  entry: "./src/main.client.js"
};

if (process.env.SSR) {
  configureWebpack = {
    entry: "./src/main.server.js",
    target: "node",
    devtool: "source-map",
    output: {
      libraryTarget: "commonjs2"
    },
    optimization: {
      splitChunks: false
    },
    externals: nodeExternals({
      whitelist: /\.css$/
    }),
    plugins: [new VueSSRServerPlugin()]
  };
}

module.exports = {
  configureWebpack
};
