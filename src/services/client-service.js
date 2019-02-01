const Plasma = require('plasma-js-lib')

const plasma = new Plasma(new Plasma.providers.HttpProvider({ endpoint: 'https://operator.plasma.group/api' }))

export default plasma
