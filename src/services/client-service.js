const Plasma = require('plasma-js-lib')

const plasma = new Plasma(new Plasma.providers.HttpProvider({ endpoint: 'http://localhost:3000/api' }))
// const plasma = new Plasma(new Plasma.providers.HttpProvider({ endpoint: 'http://107.22.13.89/api' }))

export default plasma
