const path = require('path')
const assert = require('assert')
const { findRelatedFiles } = require('../../main')

const appRoot = path.join(__dirname, '..', 'fixtures', 'example-app-ts')

const { describe, it } = global

describe('Integration tests - findRelatedFiles()', () => {
  describe('Component', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/components/foo-bar.ts'), [
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.ts' }
      ])
    })

    it('works for templates', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/templates/components/foo-bar.hbs'), [
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Component',        path: 'app/components/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.ts' }
      ])
    })

    it('works for styles', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/styles/components/foo-bar.scss'), [
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Component',        path: 'app/components/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/components/foo-bar-test.ts'), [
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Component',        path: 'app/components/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.ts' }
      ])
    })

    it('works for integration test', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/components/foo-bar-test.ts'), [
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Component',        path: 'app/components/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.ts' }
      ])
    })
  })

  describe('Route', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/routes/foo-bar.ts'), [
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Controller',       path: 'app/controllers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.ts' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/routes/foo-bar-test.ts'), [
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Controller',       path: 'app/controllers/foo-bar.ts' },
        { label: 'Route',            path: 'app/routes/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/routes/foo-bar-test.ts'), [
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Controller',       path: 'app/controllers/foo-bar.ts' },
        { label: 'Route',            path: 'app/routes/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.ts' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.ts' }
      ])
    })
  })

  describe('Controller', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/controllers/foo-bar.ts'), [
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Route',            path: 'app/routes/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.ts' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/controllers/foo-bar-test.ts'), [
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Controller',       path: 'app/controllers/foo-bar.ts' },
        { label: 'Route',            path: 'app/routes/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/controllers/foo-bar-test.ts'), [
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Controller',       path: 'app/controllers/foo-bar.ts' },
        { label: 'Route',            path: 'app/routes/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.ts' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.ts' }
      ])
    })

    it('works for templates', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/templates/foo-bar.hbs'), [
        { label: 'Controller',       path: 'app/controllers/foo-bar.ts' },
        { label: 'Route',            path: 'app/routes/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.ts' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.ts' }
      ])
    })
  })

  describe('Models', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/models/foo-bar.ts'), [
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/models/foo-bar-test.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/models/foo-bar-test.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })
  })

  describe('Utils', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/utils/foo-bar.ts'), [
        { label: 'Unit Test',        path: 'tests/unit/utils/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/utils/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/utils/foo-bar-test.ts'), [
        { label: 'Util',             path: 'app/utils/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/utils/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/utils/foo-bar-test.ts'), [
        { label: 'Util',             path: 'app/utils/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/utils/foo-bar-test.ts' }
      ])
    })
  })

  describe('Helpers', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/helpers/foo-bar.ts'), [
        { label: 'Unit Test',        path: 'tests/unit/helpers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/helpers/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/helpers/foo-bar-test.ts'), [
        { label: 'Helper',           path: 'app/helpers/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/helpers/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/helpers/foo-bar-test.ts'), [
        { label: 'Helper',           path: 'app/helpers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/helpers/foo-bar-test.ts' }
      ])
    })
  })

  describe('Mixins', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/mixins/foo-bar.ts'), [
        { label: 'Unit Test',        path: 'tests/unit/mixins/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/mixins/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/mixins/foo-bar-test.ts'), [
        { label: 'Mixin',            path: 'app/mixins/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/mixins/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/mixins/foo-bar-test.ts'), [
        { label: 'Mixin',            path: 'app/mixins/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/mixins/foo-bar-test.ts' }
      ])
    })
  })

  describe('Adapters', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/adapters/foo-bar.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/adapters/foo-bar-test.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/adapters/foo-bar-test.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })
  })

  describe('Serializers', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/serializers/foo-bar.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/serializers/foo-bar-test.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/serializers/foo-bar-test.ts'), [
        { label: 'Model',            path: 'app/models/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.ts' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.ts' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.ts' }
      ])
    })
  })

  describe('Services', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/services/foo-bar.ts'), [
        { label: 'Unit Test',        path: 'tests/unit/services/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/services/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/services/foo-bar-test.ts'), [
        { label: 'Service',          path: 'app/services/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/services/foo-bar-test.ts' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/services/foo-bar-test.ts'), [
        { label: 'Service',          path: 'app/services/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/services/foo-bar-test.ts' }
      ])
    })
  })

  describe('Initializers', () => {
    it('works for implementations', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'app/initializers/foo-bar.ts'), [
        { label: 'Unit Test',        path: 'tests/unit/initializers/foo-bar-test.ts' },
        { label: 'Integration Test', path: 'tests/integration/initializers/foo-bar-test.ts' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/unit/initializers/foo-bar-test.ts'), [
        { label: 'Initializer',      path: 'app/initializers/foo-bar.ts' },
        { label: 'Integration Test', path: 'tests/integration/initializers/foo-bar-test.ts' }
      ])
    })

    it('works for initializer tests', () => {
      assert.deepEqual(findRelatedFiles(appRoot, 'tests/integration/initializers/foo-bar-test.ts'), [
        { label: 'Initializer',      path: 'app/initializers/foo-bar.ts' },
        { label: 'Unit Test',        path: 'tests/unit/initializers/foo-bar-test.ts' }
      ])
    })
  })
})
