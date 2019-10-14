// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// const plugins = [
//     new HtmlWebpackPlugin({
//         template: './src/index.html',
//         filename: './index.html',
//     }),
//     new MonacoWebpackPlugin({
//         languages: ['typescript', 'javascript'],
//         features: ['!toggleHighContrast', '!accessibilityHelp', '!codelens'],
//     }),
// ];

// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                 },
//             },
//             {
//                 test: /\.html$/,
//                 use: [
//                     {
//                         loader: 'html-loader',
//                     },
//                 ],
//             },
//             {
//                 test: /\.css$/,
//                 use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
//             },
//         ],
//     },
//     plugins,
// };

// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
const glob = require('glob');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const extraPlugins = [
    new MonacoWebpackPlugin({
        languages: ['typescript', 'javascript'],
        features: ['!toggleHighContrast', '!accessibilityHelp', '!codelens'],
    }),
    new Dotenv(),
];

const distPath = path.join(__dirname, 'dist');
const templateHtml = path.join(__dirname, './src/views/view-template.html');
const viewsFiles = glob.sync('./src/views/*.js');

const indexEntry = {
    bundle: {
        index: ['./src/index.js'],
    },
    htmlEntry: new HtmlWebpackPlugin({
        inject: true,
        chunks: ['index'],
        template: './src/index.html',
        filename: `${distPath}/index.html`,
    }),
};

const pagesEntries = viewsFiles.reduce(
    (acc, entryFilePath) => {
        const fileName = path.basename(entryFilePath, '.js');

        acc.bundles[fileName] = [entryFilePath];

        const htmlPage = new HtmlWebpackPlugin({
            inject: true,
            chunks: [fileName],
            template: templateHtml,
            filename: `${distPath}/${fileName}.html`,
        });

        acc.htmlEntries.push(htmlPage);
        return acc;
    },
    {
        bundles: {},
        htmlEntries: [],
    },
);

module.exports = {
    entry: { ...indexEntry.bundle, ...pagesEntries.bundles },
    output: {
        filename: '[name].bundle.js',
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
        ],
    },
    plugins: [...extraPlugins, indexEntry.htmlEntry, ...pagesEntries.htmlEntries],
};
