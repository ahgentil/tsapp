import fastify from 'fastify'

import tsplugin from 'tsplugin'

import { TypeABC } from './TypeABC'

declare module 'fastify' {
  interface FastifyInstance {
    decoratorA: TypeABC
  }
}

export { TypeABC } from './TypeABC' // making this type visible to the plugin

const server = fastify()

server.register(tsplugin, { optionA: 'optionA value' }) // all good here

const decoratorA = { propertyA: 'some value' } as TypeABC
server.decorate('decoratorA', decoratorA)

server.register(async (instance) => {
  const { decoratorA } = instance // all good here
  // ...
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})