export const parameters = {
  viewMode: 'docs',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Welcome', ['Introduction'], 'Components', ['Common', 'Fields']],
    },
  },
  controls: { expanded: true },
};
