const path = require('path')
const assert = require('assert')
const { findType } = require('../../main')

const appRoot = path.join(__dirname, '..', 'fixtures', 'example-app')
const addonRoot = path.join(__dirname, '..', 'fixtures', 'example-addon')

const p = (filePath) => filePath.replace(/\//g, path.sep)

describe(`Integration tests - findType()`, () => {
  it('works for Component in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'component'), [
      { label: 'example/foo-bar', path: p('app/components/example/foo-bar.js') },
      { label: 'foo-bar',         path: p('app/components/foo-bar.js') }
    ])
  })

  it('works for Component in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'component'), [
      { label: 'example/foo-bar', path: p('addon/components/example/foo-bar.js') },
      { label: 'foo-bar',         path: p('addon/components/foo-bar.js') },
      { label: 'example/foo-bar', path: p('app/components/example/foo-bar.js') },
      { label: 'foo-bar',         path: p('app/components/foo-bar.js') }
    ])
  })

  it('works for Route in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'route'), [
      { label: 'foo-bar', path: p('app/routes/foo-bar.js') }
    ])
  })

  it('works for Route in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'route'), [
      { label: 'foo-bar', path: p('addon/routes/foo-bar.js') },
      { label: 'foo-bar', path: p('app/routes/foo-bar.js') }
    ])
  })

  it('works for Controller in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'controller'), [
      { label: 'foo-bar', path: p('app/controllers/foo-bar.js') }
    ])
  })

  it('works for Controller in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'controller'), [
      { label: 'foo-bar', path: p('addon/controllers/foo-bar.js') },
      { label: 'foo-bar', path: p('app/controllers/foo-bar.js') }
    ])
  })

  it('works for Models in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'model'), [
      { label: 'example/foo-bar', path: p('app/models/example/foo-bar.js') },
      { label: 'foo-bar',         path: p('app/models/foo-bar.js') }
    ])
  })

  it('works for Models in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'model'), [
      { label: 'example/foo-bar', path: p('addon/models/example/foo-bar.js') },
      { label: 'foo-bar',         path: p('addon/models/foo-bar.js') },
      { label: 'example/foo-bar', path: p('app/models/example/foo-bar.js') },
      { label: 'foo-bar',         path: p('app/models/foo-bar.js') }
    ])
  })

  it('works for Utils in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'util'), [
      { label: 'foo-bar', path: p('app/utils/foo-bar.js') }
    ])
  })

  it('works for Utils in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'util'), [
      { label: 'foo-bar', path: p('addon/utils/foo-bar.js') },
      { label: 'foo-bar', path: p('app/utils/foo-bar.js') }
    ])
  })

  it('works for Helpers in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'helper'), [
      { label: 'foo-bar', path: p('app/helpers/foo-bar.js') }
    ])
  })

  it('works for Helpers in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'helper'), [
      { label: 'foo-bar', path: p('addon/helpers/foo-bar.js') },
      { label: 'foo-bar', path: p('app/helpers/foo-bar.js') }
    ])
  })

  it('works for Mixins in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'mixin'), [
      { label: 'foo-bar', path: p('app/mixins/foo-bar.js') }
    ])
  })

  it('works for Mixins in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'mixin'), [
      { label: 'foo-bar', path: p('addon/mixins/foo-bar.js') },
      { label: 'foo-bar', path: p('app/mixins/foo-bar.js') }
    ])
  })

  it('works for Adapters in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'adapter'), [
      { label: 'foo-bar', path: p('app/adapters/foo-bar.js') }
    ])
  })

  it('works for Adapters in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'adapter'), [
      { label: 'foo-bar', path: p('addon/adapters/foo-bar.js') },
      { label: 'foo-bar', path: p('app/adapters/foo-bar.js') }
    ])
  })

  it('works for Serializers in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'serializer'), [
      { label: 'foo-bar', path: p('app/serializers/foo-bar.js') }
    ])
  })

  it('works for Serializers in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'serializer'), [
      { label: 'foo-bar', path: p('addon/serializers/foo-bar.js') },
      { label: 'foo-bar', path: p('app/serializers/foo-bar.js') }
    ])
  })

  it('works for Services in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'service'), [
      { label: 'foo-bar', path: p('app/services/foo-bar.js') }
    ])
  })

  it('works for Services in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'service'), [
      { label: 'foo-bar', path: p('addon/services/foo-bar.js') },
      { label: 'foo-bar', path: p('app/services/foo-bar.js') }
    ])
  })

  it('works for Initializers in apps', async () => {
    assert.deepEqual(await findType(appRoot, 'initializer'), [
      { label: 'foo-bar', path: p('app/initializers/foo-bar.js') }
    ])
  })

  it('works for Initializers in addons', async () => {
    assert.deepEqual(await findType(addonRoot, 'initializer'), [
      { label: 'foo-bar', path: p('addon/initializers/foo-bar.js') },
      { label: 'foo-bar', path: p('app/initializers/foo-bar.js') }
    ])
  })
})
