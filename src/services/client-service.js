const Plasma = require('plasma-js-lib')

const plasma = new Plasma(new Plasma.providers.HttpProvider({ endpoint: 'http://localhost:3000/api' }))

export default plasma
