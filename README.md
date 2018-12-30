# plasma-explorer
`plasma-explorer` is an open-source plasma chain block explorer.

## Contributing
Welcome! If you're looking to contribute to `plasma-explorer`, you're in the right place.

### Contributing Guide and CoC
Plasma Group follows a [Contributing Guide and Code of Conduct](https://github.com/plasma-group/plasma-explorer/blob/master/.github/CONTRIBUTING.md) adapted slightly from the [Contributor Covenant](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html). All contributors are expected to read through this guide. We're here to cultivate a welcoming and inclusive contributing environment, and every new contributor needs to do their part to uphold our community standards.

### Requirements and Setup
#### Node.js
`plasma-explorer` is tested and built with [`Node.js`](https://nodejs.org/en/). Although you **do not need [`Node.js`] to use this library in your application**, you'll need to install `Node.js` (and it's corresponding package manager, `npm`) for your system before contributing.

`plasma-explorer` has been tested on the following versions of Node:

- 10.14.2

If you're having trouble getting a component of `plasma-explorer` running, please make sure you have one of the above `Node.js` versions installed.

#### Packages
`plasma-explorer` makes use of several `npm` packages.

Install all required packages with:

```
$ npm install
```

#### Vue.js
`plasma-explorer` is a [`Vue.js`](https://vuejs.org/) application. If you're not familiar with `Vue.js`, please take a look at the [`Vue.js` introduction](https://vuejs.org/v2/guide/).

### Development
You can run `plasma-explorer` in hot-reload development mode with:

```
$ npm run serve
```

### Running Tests
`plasma-explorer` makes use of a combination of [`Mocha`](https://mochajs.org/) (a testing framework) and [`Chai`](https://www.chaijs.com/) (an assertion library) for testing.

Run all tests with:

```
$ npm test
```

### Building
If you'd like to build `plasma-explorer` yourself, simply run:

```
$ npm run build
```

### Linting
Please lint your files before submitting a pull request! 

You can lint all files with:

```
npm run lint
```
