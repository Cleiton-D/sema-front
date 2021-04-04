module.exports = {
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.modules.push(`${process.cwd()}/src`);

    return config;
  }
};
