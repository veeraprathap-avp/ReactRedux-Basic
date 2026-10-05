const path = require("node:path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const copyPlugin = require("copy-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const HashAssetsPlugin = require("hash-assets-webpack-plugin");

module.exports = (rawEnv, argv) => {
  const withReport = !!process.env.npm_config_withReport;

  const HtmlWebpackPluginObj = {
    template: "src/index.ejs",
    favicon: "src/favicon.ico",
    hash: true,
    inject: true,
    // standalone page only needs the containerId bundle,
    // not the web component bundle
    chunks: ["channelNavigationMFE"],
  };

  // Shared SCSS -> CSS pipeline (runs bottom to top)
  const cssPipeline = [
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
        // Resolve relative url() (fonts/images) through webpack so they
        // point at the MFE's publicPath instead of the JSP page.
        // Absolute, root-relative and data: URLs are left untouched.
        url: {
          filter: (url) =>
            !url.startsWith("/") &&
            !url.startsWith("data:") &&
            !/^(https?:)?\/\//.test(url),
        },
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [require("autoprefixer")], // array, not a function
        },
        sourceMap: true,
      },
    },
    {
      loader: "sass-loader",
      options: { sourceMap: true },
    },
  ];

  const config = {
    mode: "production",
    devtool: "source-map",
    entry: {
      // containerId approach -> window.ChannelNavigationMFE.mount(...)
      channelNavigationMFE: {
        import: path.resolve(__dirname, "src/index"),
        library: { name: "ChannelNavigationMFE", type: "window" },
      },
      // Web component approach -> self-registers via customElements.define
      // (no library export, so it can't overwrite window.ChannelNavigationMFE)
      channelNavigationWebComponent: {
        import: path.resolve(__dirname, "./src/webComponent"),
      },
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "auto",
      // single filename option (the duplicate key was overriding the first)
      filename: (pathData) =>
        pathData.chunk.name === "channelNavigationMFE"
          ? "remoteEntry.js"
          : "[name].js",
      // avoids clashes with other webpack bundles/MFEs on the same host page
      uniqueName: "ChannelNavigationMFE",
      chunkLoadingGlobal: "webpackChunkChannelNavigationMFE",
      clean: true,
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".json"],
    },
    plugins: [
      new AssetsPlugin({
        filename: "assets.json",
        fullPath: false,
        prettyPrint: true,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      new copyPlugin({
        patterns: [
          {
            from: "src/**/*.scss",
            globOptions: {
              ignore: ["**/styles/**"],
            },
          },
        ],
      }),
      new HtmlWebpackPlugin(HtmlWebpackPluginObj),
      new HashAssetsPlugin({
        chunkNameTemplate: "js/[name].js",
        hashLength: 8,
        assetNameTemplate: "[name].[hash]",
        prettyPrint: true,
        keyTemplate: "cache",
        filename: "version.json",
      }),
    ].concat(withReport ? [new BundleAnalyzerPlugin()] : []),
    module: {
      rules: [
        {
          test: /\.(m?js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 12000,
            },
          },
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                mimetype: "image/svg+xml",
                name: "[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(css|scss|sass)$/,
          oneOf: [
            // 1) import "./fonts.scss?global"
            //    Injected straight into document.head. Use for @font-face,
            //    because fonts do not work inside a shadow root.
            {
              resourceQuery: /global/,
              use: ["style-loader", ...cssPipeline],
            },
            // 2) Everything else: styles are collected in a registry and
            //    attached by mount() (document.head) or by the custom
            //    element (shadow root) BEFORE React renders -> no flicker.
            {
              use: [
                {
                  loader: "style-loader",
                  options: {
                    insert: require.resolve("./src/styleRegistry.js"),
                  },
                },
                ...cssPipeline,
              ],
            },
          ],
        },
      ],
    },
  };
  return config;
};
