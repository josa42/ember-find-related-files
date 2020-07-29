const path = require('path')
const assert = require('assert')
const { findRelatedFiles } = require('../../main')

const appRoot = path.join(__dirname, '..', 'fixtures', 'example-app')

const { describe, it } = global

describe('Integration tests - findRelatedFiles()', () => {
  describe('Component', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/components/foo-bar.js'), [
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.js' }
      ])
    })

    it('works for templates', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/templates/components/foo-bar.hbs'), [
        { label: 'Component',        path: 'app/components/foo-bar.js' },
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.js' }
      ])
    })

    it('works for styles', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/styles/components/foo-bar.scss'), [
        { label: 'Component',        path: 'app/components/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/components/foo-bar-test.js'), [
        { label: 'Component',        path: 'app/components/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Integration Test', path: 'tests/integration/components/foo-bar-test.js' }
      ])
    })

    it('works for integration test', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/components/foo-bar-test.js'), [
        { label: 'Component',        path: 'app/components/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/components/foo-bar.hbs' },
        { label: 'Stylesheet',       path: 'app/styles/components/foo-bar.scss' },
        { label: 'Unit Test',        path: 'tests/unit/components/foo-bar-test.js' }
      ])
    })
  })

  describe('Pod Component', () => {
    const fileTargets = [
      { label: 'Component',        path: 'app/components/bar/component.js' },
      { label: 'Component',        path: 'app/components/bar/index.js' },
      { label: 'Template',         path: 'app/components/bar/index.hbs' },
      { label: 'Stylesheet',       path: 'app/components/bar/index.scss' },
      { label: 'Stylesheet',       path: 'app/components/bar/index.sass' },
      { label: 'Stylesheet',       path: 'app/components/bar/index.css' },
      { label: 'Integration Test', path: 'tests/integration/components/bar/component-test.js' },
      { label: 'Template',         path: 'app/components/bar/template.hbs' },
      { label: 'Stylesheet',       path: 'app/components/bar/style.css' },
      { label: 'Stylesheet',       path: 'app/components/bar/style.sass' },
      { label: 'Stylesheet',       path: 'app/components/bar/style.scss' },
      { label: 'Unit Test',        path: 'tests/unit/components/bar/component-test.js' }
    ]

    for (const currentFile of fileTargets) {
      it(`works for ${currentFile.label} at ${currentFile.path}`, () => {
        const relatedFiles = findRelatedFiles(appRoot, currentFile.path)

        assert.strictEqual(relatedFiles.find(f => f.path === currentFile.path), undefined)
        assert.strictEqual(relatedFiles.length, fileTargets.length - 1)

        for (const relatedFile of relatedFiles) {
          assert.ok(fileTargets.find(f => f.path === relatedFile.path))
        }
      })
    }
  })

  describe('Route', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/routes/foo-bar.js'), [
        { label: 'Controller',       path: 'app/controllers/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.js' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/routes/foo-bar-test.js'), [
        { label: 'Controller',       path: 'app/controllers/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Route',            path: 'app/routes/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/routes/foo-bar-test.js'), [
        { label: 'Controller',       path: 'app/controllers/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Route',            path: 'app/routes/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.js' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.js' }
      ])
    })
  })

  describe('Controller', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/controllers/foo-bar.js'), [
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Route',            path: 'app/routes/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.js' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/controllers/foo-bar-test.js'), [
        { label: 'Controller',       path: 'app/controllers/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Route',            path: 'app/routes/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/controllers/foo-bar-test.js'), [
        { label: 'Controller',       path: 'app/controllers/foo-bar.js' },
        { label: 'Template',         path: 'app/templates/foo-bar.hbs' },
        { label: 'Route',            path: 'app/routes/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.js' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.js' }
      ])
    })

    it('works for templates', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/templates/foo-bar.hbs'), [
        { label: 'Controller',       path: 'app/controllers/foo-bar.js' },
        { label: 'Route',            path: 'app/routes/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/controllers/foo-bar-test.js' },
        { label: 'Unit Test',        path: 'tests/unit/routes/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/routes/foo-bar-test.js' }
      ])
    })
  })

  describe('Models', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/models/foo-bar.js'), [
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/models/foo-bar-test.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/models/foo-bar-test.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })
  })

  describe('Utils', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/utils/foo-bar.js'), [
        { label: 'Unit Test',        path: 'tests/unit/utils/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/utils/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/utils/foo-bar-test.js'), [
        { label: 'Util',             path: 'app/utils/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/utils/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/utils/foo-bar-test.js'), [
        { label: 'Util',             path: 'app/utils/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/utils/foo-bar-test.js' }
      ])
    })
  })

  describe('Helpers', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/helpers/foo-bar.js'), [
        { label: 'Unit Test',        path: 'tests/unit/helpers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/helpers/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/helpers/foo-bar-test.js'), [
        { label: 'Helper',           path: 'app/helpers/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/helpers/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/helpers/foo-bar-test.js'), [
        { label: 'Helper',           path: 'app/helpers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/helpers/foo-bar-test.js' }
      ])
    })
  })

  describe('Mixins', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/mixins/foo-bar.js'), [
        { label: 'Unit Test',        path: 'tests/unit/mixins/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/mixins/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/mixins/foo-bar-test.js'), [
        { label: 'Mixin',            path: 'app/mixins/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/mixins/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/mixins/foo-bar-test.js'), [
        { label: 'Mixin',            path: 'app/mixins/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/mixins/foo-bar-test.js' }
      ])
    })
  })

  describe('Adapters', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/adapters/foo-bar.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/adapters/foo-bar-test.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/adapters/foo-bar-test.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })
  })

  describe('Serializers', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/serializers/foo-bar.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/serializers/foo-bar-test.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/serializers/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/serializers/foo-bar-test.js'), [
        { label: 'Model',            path: 'app/models/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/models/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/models/foo-bar-test.js' },
        { label: 'Adapter',          path: 'app/adapters/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/adapters/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/adapters/foo-bar-test.js' },
        { label: 'Serializer',       path: 'app/serializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/serializers/foo-bar-test.js' }
      ])
    })
  })

  describe('Services', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/services/foo-bar.js'), [
        { label: 'Unit Test',        path: 'tests/unit/services/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/services/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/services/foo-bar-test.js'), [
        { label: 'Service',          path: 'app/services/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/services/foo-bar-test.js' }
      ])
    })

    it('works for integration tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/services/foo-bar-test.js'), [
        { label: 'Service',          path: 'app/services/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/services/foo-bar-test.js' }
      ])
    })
  })

  describe('Initializers', () => {
    it('works for implementations', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'app/initializers/foo-bar.js'), [
        { label: 'Unit Test',        path: 'tests/unit/initializers/foo-bar-test.js' },
        { label: 'Integration Test', path: 'tests/integration/initializers/foo-bar-test.js' }
      ])
    })

    it('works for unit tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/unit/initializers/foo-bar-test.js'), [
        { label: 'Initializer',      path: 'app/initializers/foo-bar.js' },
        { label: 'Integration Test', path: 'tests/integration/initializers/foo-bar-test.js' }
      ])
    })

    it('works for initializer tests', () => {
      assert.deepStrictEqual(findRelatedFiles(appRoot, 'tests/integration/initializers/foo-bar-test.js'), [
        { label: 'Initializer',      path: 'app/initializers/foo-bar.js' },
        { label: 'Unit Test',        path: 'tests/unit/initializers/foo-bar-test.js' }
      ])
    })
  })
})
