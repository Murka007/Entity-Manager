const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Terser = require("terser-webpack-plugin");

const isProd = process.env.MODE === "production";
module.exports = {
    mode: process.env.MODE,
    target: ["web", "es5"],
    context: path.resolve(__dirname, "src"),
    entry: "./index.ts",
    output: {
        filename: "[contenthash:8].js",
        path: path.resolve(__dirname, "public"),
        clean: true
    },
    devServer: {
        port: 3000,
        open: true
    },
    optimization: {
        minimizer: [
            new Terser()
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd,
                minifyCSS: isProd
            }
        })
    ],
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node-modules/
        }]
    }
}