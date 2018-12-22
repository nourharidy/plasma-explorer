const plasma = require('plasma-client')

const provider = new plasma.providers.DummyProvider()
const client = new plasma.PlasmaClient(provider)

export default client
