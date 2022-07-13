<h1 align="center">Welcome to HRnet React component library 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@daphaz/hrnet-ui" target="_blank">
  <img alt="Version" src="https://badge.fury.io/js/@daphaz%2Fhrnet-ui.svg" />
  </a>
  <a href="https://damien-bonnet-14-ui-03072022.vercel.app/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> This is the react component library for HRnet

### ✨ [Demo](https://damien-bonnet-14-ui-03072022.vercel.app/)

## Install

> We recommand to use a nodejs version manager like _nvm_ and launch nvm use command to get the right Nodejs version.

```sh
# for install the package
npm i @daphaz/hrnet-ui

# for install locally
npm i
```

## Usage

### Styling Guide

> You need to implement some css variables for this library.

```css
// You need import your font here is Poppins for example
:root {
	--font-body: 'Poppins', sans-serif;
	--clr-white: #fcfcfc;
	--clr-black: #231f20;
	--clr-primary: #00798c;
	--clr-primary-light: #56ddf2;
	--clr-secondary: #dd6e42;
	--clr-secondary-light: #f4ae93;
	--clr-red: #d1495b;
	--clr-green: #698f3f;
	--clr-yellow: #e0be36;
	--clr-grey-700: #282d30;
	--clr-grey-600: #c4c4c480;
	--clr-grey-500: #74798c;
	--clr-grey-400: #9b9eac;
	--clr-grey-300: #dedede;
	--clr-grey-200: #f1f3f5;
	--clr-grey-100: #fbfbfb;
}
```

```sh
# for build the lib in production
npm run build

# for development
npm run dev

# fix eslint and format by prettier
npm run lint:fix

# check error eslint
npm run lint:strict

# format with prettier
npm run format

# check error prettier
npm run format:check
```

## Run tests

```sh
npm run test
```
