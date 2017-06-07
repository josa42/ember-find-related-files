const path = require('path')
const assert = require('assert')
const { findType } = require('../../main')

const appRoot = path.join(__dirname, '..', 'fixtures', 'example-app')

describe('Integration tests - findType()', () => {
  it('works for Component', async () => {
    assert.deepEqual(await findType(appRoot, 'component'), [
      { label: 'example/foo-bar', path: 'app/components/example/foo-bar.js' },
      { label: 'foo-bar',         path: 'app/components/foo-bar.js' }
    ])
  })

  it('works for Route', async () => {
    assert.deepEqual(await findType(appRoot, 'route'), [
      { label: 'foo-bar', path: 'app/routes/foo-bar.js' }
    ])
  })

  it('works for Controller', async () => {
    assert.deepEqual(await findType(appRoot, 'controller'), [
      { label: 'foo-bar', path: 'app/controllers/foo-bar.js' }
    ])
  })

  it('works for Models', async () => {
    assert.deepEqual(await findType(appRoot, 'model'), [
      { label: 'example/foo-bar', path: 'app/models/example/foo-bar.js' },
      { label: 'foo-bar',         path: 'app/models/foo-bar.js' }
    ])
  })

  it('works for Utils', async () => {
    assert.deepEqual(await findType(appRoot, 'util'), [
      { label: 'foo-bar', path: 'app/utils/foo-bar.js' }
    ])
  })

  it('works for Helpers', async () => {
    assert.deepEqual(await findType(appRoot, 'helper'), [
      { label: 'foo-bar', path: 'app/helpers/foo-bar.js' }
    ])
  })

  it('works for Mixins', async () => {
    assert.deepEqual(await findType(appRoot, 'mixin'), [
      { label: 'foo-bar', path: 'app/mixins/foo-bar.js' }
    ])
  })

  it('works for Adapters', async () => {
    assert.deepEqual(await findType(appRoot, 'adapter'), [
      { label: 'foo-bar', path: 'app/adapters/foo-bar.js' }
    ])
  })

  it('works for Serializers', async () => {
    assert.deepEqual(await findType(appRoot, 'serializer'), [
      { label: 'foo-bar', path: 'app/serializers/foo-bar.js' }
    ])
  })

  it('works for Services', async () => {
    assert.deepEqual(await findType(appRoot, 'service'), [
      { label: 'foo-bar', path: 'app/services/foo-bar.js' }
    ])
  })

  it('works for Initializers', async () => {
    assert.deepEqual(await findType(appRoot, 'initializer'), [
      { label: 'foo-bar', path: 'app/initializers/foo-bar.js' }
    ])
  })
})
