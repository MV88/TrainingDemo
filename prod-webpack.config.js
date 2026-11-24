const path = require("path");

const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

const favicon = path.join(__dirname, "assets", "img", "favicon.png");

module.exports = require('./MapStore2/build/buildConfig')({
    bundles: {
        'TrainingDemo': path.join(__dirname, "js", "app"),
        'TrainingDemo-embedded': path.join(__dirname, "js", "embedded"),
        'TrainingDemo-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api"),
        'geostory-embedded': path.join(__dirname, "js", "geostoryEmbedded"),
        "dashboard-embedded": path.join(__dirname, "js", "dashboardEmbedded")
    },
    themeEntries,
    paths,
    plugins: [extractThemesPlugin, ModuleFederationPlugin],
    prod: true,
    publicPath: undefined,
    cssPrefix: '.TrainingDemo',
    prodPlugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'indexTemplate.html'),
            chunks: ['TrainingDemo'],
            publicPath: 'dist/',
            inject: "body",
            hash: true,
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['TrainingDemo-embedded'],
            publicPath: 'dist/',
            inject: "body",
            hash: true,
            filename: 'embedded.html',
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'apiTemplate.html'),
            chunks: ['TrainingDemo-api'],
            publicPath: 'dist/',
            inject: 'body',
            hash: true,
            filename: 'api.html',
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'geostory-embedded-template.html'),
            chunks: ['geostory-embedded'],
            publicPath: 'dist/',
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html',
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dashboard-embedded-template.html'),
            chunks: ['dashboard-embedded'],
            publicPath: 'dist/',
            inject: 'body',
            hash: true,
            filename: 'dashboard-embedded.html',
            favicon
        })
    ],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
});
