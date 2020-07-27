const path = require('path')
const assert = require('assert')
const { findType } = require('../../main')

const appRoot = path.join(__dirname, '..', 'fixtures', 'example-app-ts')
const addonRoot = path.join(__dirname, '..', 'fixtures', 'example-addon-ts')

const { describe, it } = global

describe('Integration tests - findType()', () => {
  it('works for Component in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'component'), [
      { label: 'example/foo-bar', path: 'app/components/example/foo-bar.ts' },
      { label: 'example/index',   path: 'app/components/example/index.ts' },
      { label: 'foo-bar',         path: 'app/components/foo-bar.ts' }
    ])
  })

  it('works for Component in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'component'), [
      { label: 'example/foo-bar', path: 'addon/components/example/foo-bar.ts' },
      { label: 'foo-bar',         path: 'addon/components/foo-bar.ts' },
      { label: 'example/foo-bar', path: 'app/components/example/foo-bar.ts' },
      { label: 'foo-bar',         path: 'app/components/foo-bar.ts' }
    ])
  })

  it('works for Route in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'route'), [
      { label: 'foo-bar', path: 'app/routes/foo-bar.ts' }
    ])
  })

  it('works for Route in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'route'), [
      { label: 'foo-bar', path: 'addon/routes/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/routes/foo-bar.ts' }
    ])
  })

  it('works for Controller in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'controller'), [
      { label: 'foo-bar', path: 'app/controllers/foo-bar.ts' }
    ])
  })

  it('works for Controller in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'controller'), [
      { label: 'foo-bar', path: 'addon/controllers/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/controllers/foo-bar.ts' }
    ])
  })

  it('works for Models in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'model'), [
      { label: 'example/foo-bar', path: 'app/models/example/foo-bar.ts' },
      { label: 'foo-bar',         path: 'app/models/foo-bar.ts' }
    ])
  })

  it('works for Models in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'model'), [
      { label: 'example/foo-bar', path: 'addon/models/example/foo-bar.ts' },
      { label: 'foo-bar',         path: 'addon/models/foo-bar.ts' },
      { label: 'example/foo-bar', path: 'app/models/example/foo-bar.ts' },
      { label: 'foo-bar',         path: 'app/models/foo-bar.ts' }
    ])
  })

  it('works for Utils in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'util'), [
      { label: 'foo-bar', path: 'app/utils/foo-bar.ts' }
    ])
  })

  it('works for Utils in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'util'), [
      { label: 'foo-bar', path: 'addon/utils/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/utils/foo-bar.ts' }
    ])
  })

  it('works for Helpers in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'helper'), [
      { label: 'foo-bar', path: 'app/helpers/foo-bar.ts' }
    ])
  })

  it('works for Helpers in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'helper'), [
      { label: 'foo-bar', path: 'addon/helpers/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/helpers/foo-bar.ts' }
    ])
  })

  it('works for Mixins in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'mixin'), [
      { label: 'foo-bar', path: 'app/mixins/foo-bar.ts' }
    ])
  })

  it('works for Mixins in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'mixin'), [
      { label: 'foo-bar', path: 'addon/mixins/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/mixins/foo-bar.ts' }
    ])
  })

  it('works for Adapters in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'adapter'), [
      { label: 'foo-bar', path: 'app/adapters/foo-bar.ts' }
    ])
  })

  it('works for Adapters in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'adapter'), [
      { label: 'foo-bar', path: 'addon/adapters/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/adapters/foo-bar.ts' }
    ])
  })

  it('works for Serializers in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'serializer'), [
      { label: 'foo-bar', path: 'app/serializers/foo-bar.ts' }
    ])
  })

  it('works for Serializers in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'serializer'), [
      { label: 'foo-bar', path: 'addon/serializers/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/serializers/foo-bar.ts' }
    ])
  })

  it('works for Services in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'service'), [
      { label: 'foo-bar', path: 'app/services/foo-bar.ts' }
    ])
  })

  it('works for Services in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'service'), [
      { label: 'foo-bar', path: 'addon/services/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/services/foo-bar.ts' }
    ])
  })

  it('works for Initializers in apps', async () => {
    assert.deepStrictEqual(await findType(appRoot, 'initializer'), [
      { label: 'foo-bar', path: 'app/initializers/foo-bar.ts' }
    ])
  })

  it('works for Initializers in addons', async () => {
    assert.deepStrictEqual(await findType(addonRoot, 'initializer'), [
      { label: 'foo-bar', path: 'addon/initializers/foo-bar.ts' },
      { label: 'foo-bar', path: 'app/initializers/foo-bar.ts' }
    ])
  })
})
