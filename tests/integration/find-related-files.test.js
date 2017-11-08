const path = require('path')
const assert = require('assert')
const { findRelatedFiles } = require('../../main')

const appRoot = path.join(__dirname, '..', 'fixtures', 'example-app')
const p = (filePath) => filePath.replace(/\//g, path.sep)

describe('Integration tests - findRelatedFiles()', () => {
  describe('Component', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/components/foo-bar.js')), [
        { label: 'Template',         path: p('app/templates/components/foo-bar.hbs') },
        { label: 'Stylesheet',       path: p('app/styles/components/foo-bar.scss') },
        { label: 'Unit Test',        path: p('tests/unit/components/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/components/foo-bar-test.js') }
      ])
    })

    it('works for templates', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/templates/components/foo-bar.hbs')), [
        { label: 'Component',        path: p('app/components/foo-bar.js') },
        { label: 'Stylesheet',       path: p('app/styles/components/foo-bar.scss') },
        { label: 'Unit Test',        path: p('tests/unit/components/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/components/foo-bar-test.js') }
      ])
    })

    it('works for styles', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/styles/components/foo-bar.scss')), [
        { label: 'Component',        path: p('app/components/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/components/foo-bar.hbs') },
        { label: 'Unit Test',        path: p('tests/unit/components/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/components/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/components/foo-bar-test.js')), [
        { label: 'Component',        path: p('app/components/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/components/foo-bar.hbs') },
        { label: 'Stylesheet',       path: p('app/styles/components/foo-bar.scss') },
        { label: 'Integration Test', path: p('tests/integration/components/foo-bar-test.js') }
      ])
    })

    it('works for integration test', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/components/foo-bar-test.js')), [
        { label: 'Component',        path: p('app/components/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/components/foo-bar.hbs') },
        { label: 'Stylesheet',       path: p('app/styles/components/foo-bar.scss') },
        { label: 'Unit Test',        path: p('tests/unit/components/foo-bar-test.js') }
      ])
    })
  })

  describe('Route', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/routes/foo-bar.js')), [
        { label: 'Controller',       path: p('app/controllers/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/foo-bar.hbs') },
        { label: 'Unit Test',        path: p('tests/unit/controllers/foo-bar-test.js') },
        { label: 'Unit Test',        path: p('tests/unit/routes/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/routes/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/routes/foo-bar-test.js')), [
        { label: 'Controller',       path: p('app/controllers/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/foo-bar.hbs') },
        { label: 'Route',            path: p('app/routes/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/controllers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/routes/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/routes/foo-bar-test.js')), [
        { label: 'Controller',       path: p('app/controllers/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/foo-bar.hbs') },
        { label: 'Route',            path: p('app/routes/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/controllers/foo-bar-test.js') },
        { label: 'Unit Test',        path: p('tests/unit/routes/foo-bar-test.js') }
      ])
    })
  })

  describe('Controller', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/controllers/foo-bar.js')), [
        { label: 'Template',         path: p('app/templates/foo-bar.hbs') },
        { label: 'Route',            path: p('app/routes/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/controllers/foo-bar-test.js') },
        { label: 'Unit Test',        path: p('tests/unit/routes/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/routes/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/controllers/foo-bar-test.js')), [
        { label: 'Controller',       path: p('app/controllers/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/foo-bar.hbs') },
        { label: 'Route',            path: p('app/routes/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/routes/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/routes/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/controllers/foo-bar-test.js')), [
        { label: 'Controller',       path: p('app/controllers/foo-bar.js') },
        { label: 'Template',         path: p('app/templates/foo-bar.hbs') },
        { label: 'Route',            path: p('app/routes/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/controllers/foo-bar-test.js') },
        { label: 'Unit Test',        path: p('tests/unit/routes/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/routes/foo-bar-test.js') }
      ])
    })

    it('works for templates', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/templates/foo-bar.hbs')), [
        { label: 'Controller',       path: p('app/controllers/foo-bar.js') },
        { label: 'Route',            path: p('app/routes/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/controllers/foo-bar-test.js') },
        { label: 'Unit Test',        path: p('tests/unit/routes/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/routes/foo-bar-test.js') }
      ])
    })
  })

  describe('Models', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/models/foo-bar.js')), [
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/models/foo-bar-test.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/models/foo-bar-test.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })
  })

  describe('Utils', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/utils/foo-bar.js')), [
        { label: 'Unit Test',        path: p('tests/unit/utils/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/utils/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/utils/foo-bar-test.js')), [
        { label: 'Util',             path: p('app/utils/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/utils/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/utils/foo-bar-test.js')), [
        { label: 'Util',             path: p('app/utils/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/utils/foo-bar-test.js') }
      ])
    })
  })

  describe('Helpers', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/helpers/foo-bar.js')), [
        { label: 'Unit Test',        path: p('tests/unit/helpers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/helpers/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/helpers/foo-bar-test.js')), [
        { label: 'Helper',           path: p('app/helpers/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/helpers/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/helpers/foo-bar-test.js')), [
        { label: 'Helper',           path: p('app/helpers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/helpers/foo-bar-test.js') }
      ])
    })
  })

  describe('Mixins', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/mixins/foo-bar.js')), [
        { label: 'Unit Test',        path: p('tests/unit/mixins/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/mixins/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/mixins/foo-bar-test.js')), [
        { label: 'Mixin',            path: p('app/mixins/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/mixins/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/mixins/foo-bar-test.js')), [
        { label: 'Mixin',            path: p('app/mixins/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/mixins/foo-bar-test.js') }
      ])
    })
  })

  describe('Adapters', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/adapters/foo-bar.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/adapters/foo-bar-test.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/adapters/foo-bar-test.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })
  })

  describe('Serializers', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/serializers/foo-bar.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/serializers/foo-bar-test.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/serializers/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/serializers/foo-bar-test.js')), [
        { label: 'Model',            path: p('app/models/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/models/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/models/foo-bar-test.js') },
        { label: 'Adapter',          path: p('app/adapters/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/adapters/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/adapters/foo-bar-test.js') },
        { label: 'Serializer',       path: p('app/serializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/serializers/foo-bar-test.js') }
      ])
    })
  })

  describe('Services', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/services/foo-bar.js')), [
        { label: 'Unit Test',        path: p('tests/unit/services/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/services/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/services/foo-bar-test.js')), [
        { label: 'Service',          path: p('app/services/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/services/foo-bar-test.js') }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/services/foo-bar-test.js')), [
        { label: 'Service',          path: p('app/services/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/services/foo-bar-test.js') }
      ])
    })
  })

  describe('Initializers', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('app/initializers/foo-bar.js')), [
        { label: 'Unit Test',        path: p('tests/unit/initializers/foo-bar-test.js') },
        { label: 'Integration Test', path: p('tests/integration/initializers/foo-bar-test.js') }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/unit/initializers/foo-bar-test.js')), [
        { label: 'Initializer',      path: p('app/initializers/foo-bar.js') },
        { label: 'Integration Test', path: p('tests/integration/initializers/foo-bar-test.js') }
      ])
    })

    it('works for initializer tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, p('tests/integration/initializers/foo-bar-test.js')), [
        { label: 'Initializer',      path: p('app/initializers/foo-bar.js') },
        { label: 'Unit Test',        path: p('tests/unit/initializers/foo-bar-test.js') }
      ])
    })
  })
})
