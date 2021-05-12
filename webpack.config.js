const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-map",
  devServer: {
    http2: false,
    https: true,
    // key: 'key.pem',
    // cert: 'cert.pem',
    // ca: fs.readFileSync ('key.pem'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
