const plasma = require('plasma-js-lib')

const provider = new plasma.providers.DummyProvider()
const client = new plasma.PlasmaClient(provider)

export default client
