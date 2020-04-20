const assert = require('assert')
const { getPath, detectType, getRelatedTypeKeys } = require('../../main')

const { describe, it } = global

describe('Unit tests', () => {
  describe('getPath()', () => {
    const source = { hostType: 'app', key: '', path: '', part: 'foo' }

    it('Component paths', () => {
      assert.strictEqual(getPath(source, 'component-ts'),             'app/components/foo.ts')
      assert.strictEqual(getPath(source, 'component-template-hbs'),   'app/templates/components/foo.hbs')
      assert.strictEqual(getPath(source, 'component-octane-template-hbs'), 'app/components/foo.hbs')
      assert.strictEqual(getPath(source, 'component-style-scss'),     'app/styles/components/foo.scss')
      assert.strictEqual(getPath(source, 'component-unit-ts'),        'tests/unit/components/foo-test.ts')
      assert.strictEqual(getPath(source, 'component-integration-ts'), 'tests/integration/components/foo-test.ts')
    })

    it('Controller paths', () => {
      assert.strictEqual(getPath(source, 'controller-ts'),             'app/controllers/foo.ts')
      assert.strictEqual(getPath(source, 'controller-template-hbs'),   'app/templates/foo.hbs')
      assert.strictEqual(getPath(source, 'controller-unit-ts'),        'tests/unit/controllers/foo-test.ts')
      assert.strictEqual(getPath(source, 'controller-integration-ts'), 'tests/integration/controllers/foo-test.ts')
    })

    it('Route paths', () => {
      assert.strictEqual(getPath(source, 'route-ts'),             'app/routes/foo.ts')
      assert.strictEqual(getPath(source, 'route-unit-ts'),        'tests/unit/routes/foo-test.ts')
      assert.strictEqual(getPath(source, 'route-integration-ts'), 'tests/integration/routes/foo-test.ts')
    })

    it('Mixin paths', () => {
      assert.strictEqual(getPath(source, 'mixin-ts'),             'app/mixins/foo.ts')
      assert.strictEqual(getPath(source, 'mixin-unit-ts'),        'tests/unit/mixins/foo-test.ts')
      assert.strictEqual(getPath(source, 'mixin-integration-ts'), 'tests/integration/mixins/foo-test.ts')
    })

    it('Models paths', () => {
      assert.strictEqual(getPath(source, 'model-ts'),             'app/models/foo.ts')
      assert.strictEqual(getPath(source, 'model-unit-ts'),        'tests/unit/models/foo-test.ts')
      assert.strictEqual(getPath(source, 'model-integration-ts'), 'tests/integration/models/foo-test.ts')
    })

    it('Adapter paths', () => {
      assert.strictEqual(getPath(source, 'adapter-ts'),             'app/adapters/foo.ts')
      assert.strictEqual(getPath(source, 'adapter-unit-ts'),        'tests/unit/adapters/foo-test.ts')
      assert.strictEqual(getPath(source, 'adapter-integration-ts'), 'tests/integration/adapters/foo-test.ts')
    })

    it('Serializer paths', () => {
      assert.strictEqual(getPath(source, 'serializer-ts'),             'app/serializers/foo.ts')
      assert.strictEqual(getPath(source, 'serializer-unit-ts'),        'tests/unit/serializers/foo-test.ts')
      assert.strictEqual(getPath(source, 'serializer-integration-ts'), 'tests/integration/serializers/foo-test.ts')
    })

    it('Util paths', () => {
      assert.strictEqual(getPath(source, 'util-ts'),             'app/utils/foo.ts')
      assert.strictEqual(getPath(source, 'util-unit-ts'),        'tests/unit/utils/foo-test.ts')
      assert.strictEqual(getPath(source, 'util-integration-ts'), 'tests/integration/utils/foo-test.ts')
    })

    it('Helper paths', () => {
      assert.strictEqual(getPath(source, 'helper-ts'),             'app/helpers/foo.ts')
      assert.strictEqual(getPath(source, 'helper-unit-ts'),        'tests/unit/helpers/foo-test.ts')
      assert.strictEqual(getPath(source, 'helper-integration-ts'), 'tests/integration/helpers/foo-test.ts')
    })

    it('Service paths', () => {
      assert.strictEqual(getPath(source, 'service-ts'),             'app/services/foo.ts')
      assert.strictEqual(getPath(source, 'service-unit-ts'),        'tests/unit/services/foo-test.ts')
      assert.strictEqual(getPath(source, 'service-integration-ts'), 'tests/integration/services/foo-test.ts')
    })

    it('Initializer paths', () => {
      assert.strictEqual(getPath(source, 'initializer-ts'),             'app/initializers/foo.ts')
      assert.strictEqual(getPath(source, 'initializer-unit-ts'),        'tests/unit/initializers/foo-test.ts')
      assert.strictEqual(getPath(source, 'initializer-integration-ts'), 'tests/integration/initializers/foo-test.ts')
    })
  })

  describe('detectType()', () => {
    it('Component and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/components/foo.ts'),                     { hostType: 'app', path: 'app/components/foo.ts', part: 'foo', key: 'component-ts' })
      assert.deepStrictEqual(detectType('/foo', 'app/templates/components/foo.hbs'),          { hostType: 'app', path: 'app/templates/components/foo.hbs', part: 'foo', key: 'component-template-hbs' })
      assert.deepStrictEqual(detectType('/foo', 'app/components/foo.hbs'),                    { hostType: 'app', path: 'app/components/foo.hbs', part: 'foo', key: 'component-octane-template-hbs' })
      assert.deepStrictEqual(detectType('/foo', 'app/styles/components/foo.scss'),            { hostType: 'app', path: 'app/styles/components/foo.scss', part: 'foo', key: 'component-style-scss' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/components/foo-test.ts'),         { hostType: 'app', path: 'tests/unit/components/foo-test.ts', part: 'foo', key: 'component-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/components/foo-test.ts'),  { hostType: 'app', path: 'tests/integration/components/foo-test.ts', part: 'foo', key: 'component-integration-ts' })
    })

    it('Route and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/routes/foo.ts'),                         { hostType: 'app', path: 'app/routes/foo.ts', part: 'foo', key: 'route-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/routes/foo-test.ts'),             { hostType: 'app', path: 'tests/unit/routes/foo-test.ts', part: 'foo', key: 'route-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/routes/foo-test.ts'),      { hostType: 'app', path: 'tests/integration/routes/foo-test.ts', part: 'foo', key: 'route-integration-ts' })
    })

    it('Controller and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/controllers/foo.ts'),                    { hostType: 'app', path: 'app/controllers/foo.ts', part: 'foo', key: 'controller-ts' })
      assert.deepStrictEqual(detectType('/foo', 'app/templates/foo.hbs'),                     { hostType: 'app', path: 'app/templates/foo.hbs', part: 'foo', key: 'controller-template-hbs' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/controllers/foo-test.ts'),        { hostType: 'app', path: 'tests/unit/controllers/foo-test.ts', part: 'foo', key: 'controller-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/controllers/foo-test.ts'), { hostType: 'app', path: 'tests/integration/controllers/foo-test.ts', part: 'foo', key: 'controller-integration-ts' })
    })

    it('Model and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/models/foo.ts'),                         { hostType: 'app', path: 'app/models/foo.ts', part: 'foo', key: 'model-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/models/foo-test.ts'),             { hostType: 'app', path: 'tests/unit/models/foo-test.ts', part: 'foo', key: 'model-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/models/foo-test.ts'),      { hostType: 'app', path: 'tests/integration/models/foo-test.ts', part: 'foo', key: 'model-integration-ts' })
    })

    it('Adapter and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/adapters/foo.ts'),                       { hostType: 'app', path: 'app/adapters/foo.ts', part: 'foo', key: 'adapter-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/adapters/foo-test.ts'),           { hostType: 'app', path: 'tests/unit/adapters/foo-test.ts', part: 'foo', key: 'adapter-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/adapters/foo-test.ts'),    { hostType: 'app', path: 'tests/integration/adapters/foo-test.ts', part: 'foo', key: 'adapter-integration-ts' })
    })

    it('Serializer and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/serializers/foo.ts'),                    { hostType: 'app', path: 'app/serializers/foo.ts', part: 'foo', key: 'serializer-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/serializers/foo-test.ts'),        { hostType: 'app', path: 'tests/unit/serializers/foo-test.ts', part: 'foo', key: 'serializer-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/serializers/foo-test.ts'), { hostType: 'app', path: 'tests/integration/serializers/foo-test.ts', part: 'foo', key: 'serializer-integration-ts' })
    })

    it('Util and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/utils/foo.ts'),                          { hostType: 'app', path: 'app/utils/foo.ts', part: 'foo', key: 'util-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/utils/foo-test.ts'),              { hostType: 'app', path: 'tests/unit/utils/foo-test.ts', part: 'foo', key: 'util-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/utils/foo-test.ts'),       { hostType: 'app', path: 'tests/integration/utils/foo-test.ts', part: 'foo', key: 'util-integration-ts' })
    })

    it('Helper and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/helpers/foo.ts'),                        { hostType: 'app', path: 'app/helpers/foo.ts', part: 'foo', key: 'helper-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/helpers/foo-test.ts'),            { hostType: 'app', path: 'tests/unit/helpers/foo-test.ts', part: 'foo', key: 'helper-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/helpers/foo-test.ts'),     { hostType: 'app', path: 'tests/integration/helpers/foo-test.ts', part: 'foo', key: 'helper-integration-ts' })
    })

    it('Mixin and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/mixins/foo.ts'),                         { hostType: 'app', path: 'app/mixins/foo.ts', part: 'foo', key: 'mixin-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/mixins/foo-test.ts'),             { hostType: 'app', path: 'tests/unit/mixins/foo-test.ts', part: 'foo', key: 'mixin-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/mixins/foo-test.ts'),      { hostType: 'app', path: 'tests/integration/mixins/foo-test.ts', part: 'foo', key: 'mixin-integration-ts' })
    })

    it('Service and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/services/foo.ts'),                       { hostType: 'app', path: 'app/services/foo.ts', part: 'foo', key: 'service-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/services/foo-test.ts'),           { hostType: 'app', path: 'tests/unit/services/foo-test.ts', part: 'foo', key: 'service-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/services/foo-test.ts'),    { hostType: 'app', path: 'tests/integration/services/foo-test.ts', part: 'foo', key: 'service-integration-ts' })
    })

    it('Initializer and related types', () => {
      assert.deepStrictEqual(detectType('/foo', 'app/initializers/foo.ts'),                       { hostType: 'app', path: 'app/initializers/foo.ts', part: 'foo', key: 'initializer-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/unit/initializers/foo-test.ts'),           { hostType: 'app', path: 'tests/unit/initializers/foo-test.ts', part: 'foo', key: 'initializer-unit-ts' })
      assert.deepStrictEqual(detectType('/foo', 'tests/integration/initializers/foo-test.ts'),    { hostType: 'app', path: 'tests/integration/initializers/foo-test.ts', part: 'foo', key: 'initializer-integration-ts' })
    })
  })

  describe('getRelatedTypeKeys()', () => {
    it('Component and related types', () => {
      const types = ['component-js', 'component-template-hbs', 'component-octane-template-hbs', 'component-style-css', 'component-style-sass', 'component-style-scss', 'component-unit-js', 'component-integration-js', 'component-ts', 'component-unit-ts', 'component-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Controller and related types', () => {
      const types = ['controller-js', 'controller-template-hbs', 'route-js', 'controller-unit-js', 'controller-integration-js', 'route-unit-js', 'route-integration-js', 'controller-ts', 'route-ts', 'controller-unit-ts', 'controller-integration-ts', 'route-unit-ts', 'route-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Mixin and related types', () => {
      const types = ['mixin-js', 'mixin-unit-js', 'mixin-integration-js', 'mixin-ts', 'mixin-unit-ts', 'mixin-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Model and related types', () => {
      const types = ['model-js', 'model-unit-js', 'model-integration-js', 'adapter-js', 'adapter-unit-js', 'adapter-integration-js', 'serializer-js', 'serializer-unit-js', 'serializer-integration-js', 'model-ts', 'model-unit-ts', 'model-integration-ts', 'adapter-ts', 'adapter-unit-ts', 'adapter-integration-ts', 'serializer-ts', 'serializer-unit-ts', 'serializer-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Util and related types', () => {
      const types = ['util-js', 'util-unit-js', 'util-integration-js', 'util-ts', 'util-unit-ts', 'util-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Helper and related types', () => {
      const types = ['helper-js', 'helper-unit-js', 'helper-integration-js', 'helper-ts', 'helper-unit-ts', 'helper-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Service and related types', () => {
      const types = ['service-js', 'service-unit-js', 'service-integration-js', 'service-ts', 'service-unit-ts', 'service-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Initializer and related types', () => {
      const types = ['initializer-js', 'initializer-unit-js', 'initializer-integration-js', 'initializer-ts', 'initializer-unit-ts', 'initializer-integration-ts']
      types.forEach((type) => {
        assert.deepStrictEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })
  })
})
