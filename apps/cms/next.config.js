const {join} = require('path');

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    experimental: {
        outputStandalone: true,
    },
    webpack: (config, {defaultLoaders, isServer}) => {
        if (process.env.NODE_ENV === 'test') {
            config.module.rules.push({
                test: /\.+(js|jsx|mjs|ts|tsx)$/,
                use: {
                    loader: require.resolve('next/dist/build/babel/loader'),
                    options: {
                        isServer,
                        distDir: join(__dirname, '.next'),
                        pagesDir: join(__dirname, 'pages'),
                        configFile: join(__dirname, 'cypress', '.babelrc'),
                        cwd: __dirname,
                        development: true,
                        hasReactRefresh: !isServer,
                        hasJsxRuntime: true,
                    },
                },
            });
        }

        return config;
    }
}
