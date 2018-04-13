const webpack = require("webpack");
const path = require("path");

// We'll be using the ExtractTextPlugin to extract any required CSS into a
// // single CSS file
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// // We'll use CopyWebpackPlugin to copy over static assets like images and
// fonts
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Development environment
const env = process.env.MIX_ENV || "dev";
const isProduction = env === "prod";

// We'll set up some paths for our generated files and our development server
const staticDir = path.join(__dirname, ".");
const destDir = path.join(__dirname, "../priv/static");
const publicPath = "/";

module.exports = {
  // entry: {
  //   app: staticDir + "/js/app.js",
  //   css: staticDir + "/css/app.scss"
  // },
  entry: [staticDir + "/js/app.js", staticDir + "/css/app.scss"],
  output: {
    path: destDir,
    filename: "js/app.bundle.js",
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        // use: [
        //   {
        //   },
        // ],
        options: {
          presets: ["es2015", "react"]
        }
      },
      // Any CSS or SCSS files will run through the css loader, the sass
      // loader, and the import-glob-loader. The last one will allow us to use
      // glob patterns to import SCSS files - for instance, a whole directory of
      // them. That isn't available by default in node-sass
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          use: "css-loader!sass-loader!import-glob-loader",
          fallback: "style-loader"
        })
      }
    ]
  },
  // And we'll configure our ExtractTextPlugin and CopyWebpackPlugin
  plugins: [
    new ExtractTextPlugin("css/app.css"),
    // We copy our images and fonts to the output folder
    new CopyWebpackPlugin([{ from: "./static/images", to: "images" }])
  ]
};
