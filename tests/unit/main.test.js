const assert = require('assert')
const { getPath, detectType, getRelatedTypeKeys } = require('../../main')

const { describe, it } = global

describe('Unit tests', () => {
  describe('getPath()', () => {
    const source = { hostType: 'app', key: '', path: '', part: 'foo' }

    it('Component paths', () => {
      assert.equal(getPath(source, 'component-js'),             'app/components/foo.js')
      assert.equal(getPath(source, 'component-template-hbs'),   'app/templates/components/foo.hbs')
      assert.equal(getPath(source, 'component-style-scss'),     'app/styles/components/foo.scss')
      assert.equal(getPath(source, 'component-unit-js'),        'tests/unit/components/foo-test.js')
      assert.equal(getPath(source, 'component-integration-js'), 'tests/integration/components/foo-test.js')
    })

    it('Pod Components paths', () => {
      assert.equal(getPath(source, 'pod-component-js'), 'app/components/foo/component.js')
      assert.equal(getPath(source, 'pod-component-template-hbs'), 'app/components/foo/template.hbs')
      assert.equal(getPath(source, 'pod-component-style-scss'), 'app/components/foo/style.scss')
      assert.equal(getPath(source, 'pod-component-style-sass'), 'app/components/foo/style.sass')
      assert.equal(getPath(source, 'pod-component-unit-js'), 'tests/unit/components/foo/component-test.js')
      assert.equal(getPath(source, 'pod-component-integration-js'), 'tests/integration/components/foo/component-test.js')
    })

    it('Controller paths', () => {
      assert.equal(getPath(source, 'controller-js'),             'app/controllers/foo.js')
      assert.equal(getPath(source, 'controller-template-hbs'),   'app/templates/foo.hbs')
      assert.equal(getPath(source, 'controller-unit-js'),        'tests/unit/controllers/foo-test.js')
      assert.equal(getPath(source, 'controller-integration-js'), 'tests/integration/controllers/foo-test.js')
    })

    it('Route paths', () => {
      assert.equal(getPath(source, 'route-js'),             'app/routes/foo.js')
      assert.equal(getPath(source, 'route-unit-js'),        'tests/unit/routes/foo-test.js')
      assert.equal(getPath(source, 'route-integration-js'), 'tests/integration/routes/foo-test.js')
    })

    it('Mixin paths', () => {
      assert.equal(getPath(source, 'mixin-js'),             'app/mixins/foo.js')
      assert.equal(getPath(source, 'mixin-unit-js'),        'tests/unit/mixins/foo-test.js')
      assert.equal(getPath(source, 'mixin-integration-js'), 'tests/integration/mixins/foo-test.js')
    })

    it('Models paths', () => {
      assert.equal(getPath(source, 'model-js'),             'app/models/foo.js')
      assert.equal(getPath(source, 'model-unit-js'),        'tests/unit/models/foo-test.js')
      assert.equal(getPath(source, 'model-integration-js'), 'tests/integration/models/foo-test.js')
    })

    it('Adapter paths', () => {
      assert.equal(getPath(source, 'adapter-js'),             'app/adapters/foo.js')
      assert.equal(getPath(source, 'adapter-unit-js'),        'tests/unit/adapters/foo-test.js')
      assert.equal(getPath(source, 'adapter-integration-js'), 'tests/integration/adapters/foo-test.js')
    })

    it('Serializer paths', () => {
      assert.equal(getPath(source, 'serializer-js'),             'app/serializers/foo.js')
      assert.equal(getPath(source, 'serializer-unit-js'),        'tests/unit/serializers/foo-test.js')
      assert.equal(getPath(source, 'serializer-integration-js'), 'tests/integration/serializers/foo-test.js')
    })

    it('Util paths', () => {
      assert.equal(getPath(source, 'util-js'),             'app/utils/foo.js')
      assert.equal(getPath(source, 'util-unit-js'),        'tests/unit/utils/foo-test.js')
      assert.equal(getPath(source, 'util-integration-js'), 'tests/integration/utils/foo-test.js')
    })

    it('Helper paths', () => {
      assert.equal(getPath(source, 'helper-js'),             'app/helpers/foo.js')
      assert.equal(getPath(source, 'helper-unit-js'),        'tests/unit/helpers/foo-test.js')
      assert.equal(getPath(source, 'helper-integration-js'), 'tests/integration/helpers/foo-test.js')
    })

    it('Service paths', () => {
      assert.equal(getPath(source, 'service-js'),             'app/services/foo.js')
      assert.equal(getPath(source, 'service-unit-js'),        'tests/unit/services/foo-test.js')
      assert.equal(getPath(source, 'service-integration-js'), 'tests/integration/services/foo-test.js')
    })

    it('Initializer paths', () => {
      assert.equal(getPath(source, 'initializer-js'),             'app/initializers/foo.js')
      assert.equal(getPath(source, 'initializer-unit-js'),        'tests/unit/initializers/foo-test.js')
      assert.equal(getPath(source, 'initializer-integration-js'), 'tests/integration/initializers/foo-test.js')
    })
  })

  describe('detectType()', () => {
    it('Component and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/components/foo.js'),                     { hostType: 'app', path: 'app/components/foo.js', part: 'foo', key: 'component-js' })
      assert.deepEqual(detectType('/foo', 'app/templates/components/foo.hbs'),          { hostType: 'app', path: 'app/templates/components/foo.hbs', part: 'foo', key: 'component-template-hbs' })
      assert.deepEqual(detectType('/foo', 'app/styles/components/foo.scss'),            { hostType: 'app', path: 'app/styles/components/foo.scss', part: 'foo', key: 'component-style-scss' })
      assert.deepEqual(detectType('/foo', 'tests/unit/components/foo-test.js'),         { hostType: 'app', path: 'tests/unit/components/foo-test.js', part: 'foo', key: 'component-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/components/foo-test.js'),  { hostType: 'app', path: 'tests/integration/components/foo-test.js', part: 'foo', key: 'component-integration-js' })
    })

    it('Pod Component and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/components/foo/component.js'),                     { hostType: 'app', path: 'app/components/foo/component.js', part: 'foo', key: 'pod-component-js' })
      assert.deepEqual(detectType('/foo', 'app/components/foo/template.hbs'),                     { hostType: 'app', path: 'app/components/foo/template.hbs', part: 'foo', key: 'pod-component-template-hbs' })
      assert.deepEqual(detectType('/foo', 'app/components/foo/style.scss'),                       { hostType: 'app', path: 'app/components/foo/style.scss', part: 'foo', key: 'pod-component-style-scss' })
      assert.deepEqual(detectType('/foo', 'app/components/foo/style.sass'),                       { hostType: 'app', path: 'app/components/foo/style.sass', part: 'foo', key: 'pod-component-style-sass' })
      assert.deepEqual(detectType('/foo', 'tests/unit/components/foo/component-test.js'),         { hostType: 'app', path: 'tests/unit/components/foo/component-test.js', part: 'foo', key: 'pod-component-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/components/foo/component-test.js'),  { hostType: 'app', path: 'tests/integration/components/foo/component-test.js', part: 'foo', key: 'pod-component-integration-js' })
    })

    it('Route and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/routes/foo.js'),                         { hostType: 'app', path: 'app/routes/foo.js', part: 'foo', key: 'route-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/routes/foo-test.js'),             { hostType: 'app', path: 'tests/unit/routes/foo-test.js', part: 'foo', key: 'route-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/routes/foo-test.js'),      { hostType: 'app', path: 'tests/integration/routes/foo-test.js', part: 'foo', key: 'route-integration-js' })
    })

    it('Controller and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/controllers/foo.js'),                    { hostType: 'app', path: 'app/controllers/foo.js', part: 'foo', key: 'controller-js' })
      assert.deepEqual(detectType('/foo', 'app/templates/foo.hbs'),                     { hostType: 'app', path: 'app/templates/foo.hbs', part: 'foo', key: 'controller-template-hbs' })
      assert.deepEqual(detectType('/foo', 'tests/unit/controllers/foo-test.js'),        { hostType: 'app', path: 'tests/unit/controllers/foo-test.js', part: 'foo', key: 'controller-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/controllers/foo-test.js'), { hostType: 'app', path: 'tests/integration/controllers/foo-test.js', part: 'foo', key: 'controller-integration-js' })
    })

    it('Model and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/models/foo.js'),                         { hostType: 'app', path: 'app/models/foo.js', part: 'foo', key: 'model-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/models/foo-test.js'),             { hostType: 'app', path: 'tests/unit/models/foo-test.js', part: 'foo', key: 'model-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/models/foo-test.js'),      { hostType: 'app', path: 'tests/integration/models/foo-test.js', part: 'foo', key: 'model-integration-js' })
    })

    it('Adapter and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/adapters/foo.js'),                       { hostType: 'app', path: 'app/adapters/foo.js', part: 'foo', key: 'adapter-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/adapters/foo-test.js'),           { hostType: 'app', path: 'tests/unit/adapters/foo-test.js', part: 'foo', key: 'adapter-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/adapters/foo-test.js'),    { hostType: 'app', path: 'tests/integration/adapters/foo-test.js', part: 'foo', key: 'adapter-integration-js' })
    })

    it('Serializer and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/serializers/foo.js'),                    { hostType: 'app', path: 'app/serializers/foo.js', part: 'foo', key: 'serializer-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/serializers/foo-test.js'),        { hostType: 'app', path: 'tests/unit/serializers/foo-test.js', part: 'foo', key: 'serializer-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/serializers/foo-test.js'), { hostType: 'app', path: 'tests/integration/serializers/foo-test.js', part: 'foo', key: 'serializer-integration-js' })
    })

    it('Util and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/utils/foo.js'),                          { hostType: 'app', path: 'app/utils/foo.js', part: 'foo', key: 'util-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/utils/foo-test.js'),              { hostType: 'app', path: 'tests/unit/utils/foo-test.js', part: 'foo', key: 'util-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/utils/foo-test.js'),       { hostType: 'app', path: 'tests/integration/utils/foo-test.js', part: 'foo', key: 'util-integration-js' })
    })

    it('Helper and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/helpers/foo.js'),                        { hostType: 'app', path: 'app/helpers/foo.js', part: 'foo', key: 'helper-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/helpers/foo-test.js'),            { hostType: 'app', path: 'tests/unit/helpers/foo-test.js', part: 'foo', key: 'helper-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/helpers/foo-test.js'),     { hostType: 'app', path: 'tests/integration/helpers/foo-test.js', part: 'foo', key: 'helper-integration-js' })
    })

    it('Mixin and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/mixins/foo.js'),                         { hostType: 'app', path: 'app/mixins/foo.js', part: 'foo', key: 'mixin-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/mixins/foo-test.js'),             { hostType: 'app', path: 'tests/unit/mixins/foo-test.js', part: 'foo', key: 'mixin-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/mixins/foo-test.js'),      { hostType: 'app', path: 'tests/integration/mixins/foo-test.js', part: 'foo', key: 'mixin-integration-js' })
    })

    it('Service and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/services/foo.js'),                       { hostType: 'app', path: 'app/services/foo.js', part: 'foo', key: 'service-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/services/foo-test.js'),           { hostType: 'app', path: 'tests/unit/services/foo-test.js', part: 'foo', key: 'service-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/services/foo-test.js'),    { hostType: 'app', path: 'tests/integration/services/foo-test.js', part: 'foo', key: 'service-integration-js' })
    })

    it('Initializer and related types', () => {
      assert.deepEqual(detectType('/foo', 'app/initializers/foo.js'),                       { hostType: 'app', path: 'app/initializers/foo.js', part: 'foo', key: 'initializer-js' })
      assert.deepEqual(detectType('/foo', 'tests/unit/initializers/foo-test.js'),           { hostType: 'app', path: 'tests/unit/initializers/foo-test.js', part: 'foo', key: 'initializer-unit-js' })
      assert.deepEqual(detectType('/foo', 'tests/integration/initializers/foo-test.js'),    { hostType: 'app', path: 'tests/integration/initializers/foo-test.js', part: 'foo', key: 'initializer-integration-js' })
    })
  })

  describe('getRelatedTypeKeys()', () => {
    it('Component and related types', () => {
      const types = ['component-js', 'component-template-hbs', 'component-style-css', 'component-style-sass', 'component-style-scss', 'component-unit-js', 'component-integration-js', 'component-ts', 'component-unit-ts', 'component-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Pod Component and related types', () => {
      const types = ['pod-component-js', 'pod-component-template-hbs', 'pod-component-style-css', 'pod-component-style-sass', 'pod-component-style-scss', 'pod-component-unit-js', 'pod-component-integration-js', 'pod-component-ts', 'pod-component-unit-ts', 'pod-component-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Controller and related types', () => {
      const types = ['controller-js', 'controller-template-hbs', 'route-js', 'controller-unit-js', 'controller-integration-js', 'route-unit-js', 'route-integration-js', 'controller-ts', 'route-ts', 'controller-unit-ts', 'controller-integration-ts', 'route-unit-ts', 'route-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Mixin and related types', () => {
      const types = ['mixin-js', 'mixin-unit-js', 'mixin-integration-js', 'mixin-ts', 'mixin-unit-ts', 'mixin-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Model and related types', () => {
      const types = ['model-js', 'model-unit-js', 'model-integration-js', 'adapter-js', 'adapter-unit-js', 'adapter-integration-js', 'serializer-js', 'serializer-unit-js', 'serializer-integration-js', 'model-ts', 'model-unit-ts', 'model-integration-ts', 'adapter-ts', 'adapter-unit-ts', 'adapter-integration-ts', 'serializer-ts', 'serializer-unit-ts', 'serializer-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Util and related types', () => {
      const types = ['util-js', 'util-unit-js', 'util-integration-js', 'util-ts', 'util-unit-ts', 'util-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Helper and related types', () => {
      const types = ['helper-js', 'helper-unit-js', 'helper-integration-js', 'helper-ts', 'helper-unit-ts', 'helper-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Service and related types', () => {
      const types = ['service-js', 'service-unit-js', 'service-integration-js', 'service-ts', 'service-unit-ts', 'service-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })

    it('Initializer and related types', () => {
      const types = ['initializer-js', 'initializer-unit-js', 'initializer-integration-js', 'initializer-ts', 'initializer-unit-ts', 'initializer-integration-ts']
      types.forEach((type) => {
        assert.deepEqual(getRelatedTypeKeys(type), types.filter((iType) => iType !== type))
      })
    })
  })
})
