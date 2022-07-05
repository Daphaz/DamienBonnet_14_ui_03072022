import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#00798c',
  colorSecondary: '#dd6e42',

  // UI
  appBg: '#faedde',
  appContentBg: '#ffffff',
  appBorderColor: '#74798c',
  appBorderRadius: 12,

  // Text colors
  textColor: '#282d30',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: '#56ddf2',
  barBg: '#282d30',

  // Form colors
  inputBg: 'transparent',
  inputBorder: '#74798c',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'HRnet UI',
  // brandUrl: 'static url',
  // brandImage: '',
});
