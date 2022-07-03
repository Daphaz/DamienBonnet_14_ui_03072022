const path = require('path');

module.exports = {
  stories: ['../lib/**/*.stories.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      include: path.resolve(__dirname, '../lib'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../lib'),
    };
    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
