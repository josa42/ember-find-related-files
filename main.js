'use babel'

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { join } = require('path')

const groups = [
  ['pod-component-js', 'pod-component-template-hbs', 'pod-component-style-css', 'pod-component-style-sass', 'pod-component-style-scss', 'pod-component-unit-js', 'pod-component-integration-js'],
  ['component-js', 'component-template-hbs', 'component-style-css', 'component-style-sass', 'component-style-scss', 'component-unit-js', 'component-integration-js'],
  ['controller-js', 'controller-template-hbs', 'route-js', 'controller-unit-js', 'controller-integration-js', 'route-unit-js', 'route-integration-js'],
  ['mixin-js', 'mixin-unit-js', 'mixin-integration-js'],
  ['model-js', 'model-unit-js', 'model-integration-js', 'adapter-js', 'adapter-unit-js', 'adapter-integration-js', 'serializer-js', 'serializer-unit-js', 'serializer-integration-js'],
  ['util-js', 'util-unit-js', 'util-integration-js'],
  ['helper-js', 'helper-unit-js', 'helper-integration-js'],
  ['service-js', 'service-unit-js', 'service-integration-js'],
  ['initializer-js', 'initializer-unit-js', 'initializer-integration-js']
]

const types = [
  { module: 'pod-component', exp: /^(app|addon)\/components\/(.+)\/component\.(js)$/ },
  { module: 'pod-component-template', exp: /^(app|addon)\/components\/(.+)\/template\.(hbs)$/ },
  { module: 'pod-component-style', exp: /^(app|addon)\/components\/(.+)\/style\.(css|sass|scss)$/ },
  { module: 'pod-component-unit', exp: /^()tests\/unit\/components\/(.+)\/component-test\.(js)$/ },
  { module: 'pod-component-integration', exp: /^()tests\/integration\/components\/(.+)\/component-test\.(js)$/ },
  { module: 'component', exp: /^(app|addon)\/components\/(.+)\.(js)$/ },
  { module: 'component-template', exp: /^(app|addon)\/templates\/components\/(.+)\.(hbs)$/ },
  { module: 'component-style', exp: /^(app|addon)\/styles\/components\/(.+)\.(css|sass|scss)$/ },
  { module: 'component-unit', exp: /^()tests\/unit\/components\/(.+)-test\.(js)$/ },
  { module: 'component-integration', exp: /^()tests\/integration\/components\/(.+)-test\.(js)$/ },
  { module: 'route', exp: /^(app|addon)\/routes\/(.+)\.(js)$/ },
  { module: 'route-unit', exp: /^()tests\/unit\/routes\/(.+)-test\.(js)$/ },
  { module: 'route-integration', exp: /^()tests\/integration\/routes\/(.+)-test\.(js)$/ },
  { module: 'controller', exp: /^(app|addon)\/controllers\/(.+)\.(js)$/ },
  { module: 'controller-unit', exp: /^()tests\/unit\/controllers\/(.+)-test\.(js)$/ },
  { module: 'controller-integration', exp: /^()tests\/integration\/controllers\/(.+)-test\.(js)$/ },
  { module: 'controller-template', exp: /^(app|addon)\/templates\/(.+)\.(hbs)$/ },
  { module: 'model', exp: /^(app|addon)\/models\/(.+)\.(js)$/ },
  { module: 'model-unit', exp: /^()tests\/unit\/models\/(.+)-test\.(js)$/ },
  { module: 'model-integration', exp: /^()tests\/integration\/models\/(.+)-test\.(js)$/ },
  { module: 'util', exp: /^(app|addon)\/utils\/(.+)\.(js)$/ },
  { module: 'util-unit', exp: /^()tests\/unit\/utils\/(.+)-test\.(js)$/ },
  { module: 'util-integration', exp: /^()tests\/integration\/utils\/(.+)-test\.(js)$/ },
  { module: 'helper', exp: /^(app|addon)\/helpers\/(.+)\.(js)$/ },
  { module: 'helper-unit', exp: /^()tests\/unit\/helpers\/(.+)-test\.(js)$/ },
  { module: 'helper-integration', exp: /^()tests\/integration\/helpers\/(.+)-test\.(js)$/ },
  { module: 'mixin', exp: /^(app|addon)\/mixins\/(.+)\.(js)$/ },
  { module: 'mixin-unit', exp: /^()tests\/unit\/mixins\/(.+)-test\.(js)$/ },
  { module: 'mixin-integration', exp: /^()tests\/integration\/mixins\/(.+)-test\.(js)$/ },
  { module: 'adapter', exp: /^(app|addon)\/adapters\/(.+)\.(js)$/ },
  { module: 'adapter-unit', exp: /^()tests\/unit\/adapters\/(.+)-test\.(js)$/ },
  { module: 'adapter-integration', exp: /^()tests\/integration\/adapters\/(.+)-test\.(js)$/ },
  { module: 'serializer', exp: /^(app|addon)\/serializers\/(.+)\.(js)$/ },
  { module: 'serializer-unit', exp: /^()tests\/unit\/serializers\/(.+)-test\.(js)$/ },
  { module: 'serializer-integration', exp: /^()tests\/integration\/serializers\/(.+)-test\.(js)$/ },
  { module: 'service', exp: /^(app|addon)\/services\/(.+)\.(js)$/ },
  { module: 'service-unit', exp: /^()tests\/unit\/services\/(.+)-test\.(js)$/ },
  { module: 'service-integration', exp: /^()tests\/integration\/services\/(.+)-test\.(js)$/ },
  { module: 'initializer', exp: /^(app|addon)\/initializers\/(.+)\.(js)$/ },
  { module: 'initializer-unit', exp: /^()tests\/unit\/initializers\/(.+)-test\.(js)$/ },
  { module: 'initializer-integration', exp: /^()tests\/integration\/initializers\/(.+)-test\.(js)$/ }
]

const HOST_TYPE_CACHE = {}

function detectHostType (rootPath) {
  const hostPath = rootPath
  if (!HOST_TYPE_CACHE[hostPath]) {
    HOST_TYPE_CACHE[hostPath] = fs.existsSync(join(String(rootPath), 'addon')) ? 'addon' : 'app'
  }

  return HOST_TYPE_CACHE[hostPath]
}

function detectType (rootPath, filePath) {
  return types
    .map((type) => {
      const m = filePath.match(type.exp)

      if (m) {
        const hostType = m[1] || detectHostType(rootPath)
        const part = m[2]
        const ext = m[3]

        return { hostType, path: filePath, part, key: `${type.module}-${ext}` }
      }
    })
    .find((type) => Boolean(type))
}

function getRelatedTypeKeys (typeKey) {
  return groups
      .find((group) => group.indexOf(typeKey) !== -1)
      .filter((key) => key !== typeKey)
}

function getPath (sourceType, typeKey) {
  const { hostType, part } = sourceType
  const [ , , pod, type, , subtype, ext ] = typeKey.match(/^((pod)-)?([a-z]+)(-([a-z]+))?-([a-z]+)$/)

  if (pod) {
    switch (subtype) {
      case 'integration':
      case 'unit':
        return `tests/${subtype}/${type}s/${part}/${type}-test.${ext}`
      default:
        return `${hostType}/components/${part}/${subtype || type}.${ext}`
    }
  } else {
    switch (subtype) {
      case 'integration':
      case 'unit':
        return `tests/${subtype}/${type}s/${part}-test.${ext}`
      case 'style':
        return `${hostType}/styles/${type}s/${part}.${ext}`
      case 'template':
        if (type === 'controller') {
          return `${hostType}/templates/${part}.${ext}`
        } else {
          return `${hostType}/templates/${type}s/${part}.${ext}`
        }
      default:
        return `${hostType}/${type}s/${part}.${ext}`
    }
  }
}

function pathToLabel (typeKey, filePath) {
  const typeDef = types.find(({ module }) => module === typeKey)
  if (typeDef) {
    const match = filePath.match(typeDef.exp)
    if (match) {
      return match[2]
    }
  }

  return filePath
}

function typeKeyToLabel (typeKey) {
  switch (typeKey) {
    case 'pod-component-js':
    case 'component-js':
      return 'Component'

    case 'pod-component-style-scss':
    case 'pod-component-style-sass':
    case 'pod-component-style-css':
    case 'component-style-scss':
      return 'Stylesheet'

    case 'route-js':
      return 'Route'

    case 'controller-js':
      return 'Controller'

    case 'mixin-js':
      return 'Mixin'

    case 'model-js':
      return 'Model'

    case 'util-js':
      return 'Util'

    case 'helper-js':
      return 'Helper'

    case 'adapter-js':
      return 'Adapter'

    case 'serializer-js':
      return 'Serializer'

    case 'service-js':
      return 'Service'

    case 'initializer-js':
      return 'Initializer'

    case 'pod-component-template-hbs':
    case 'component-template-hbs':
    case 'controller-template-hbs':
      return 'Template'

    case 'pod-component-unit-js':
    case 'component-unit-js':
    case 'route-unit-js':
    case 'controller-unit-js':
    case 'mixin-unit-js':
    case 'model-unit-js':
    case 'util-unit-js':
    case 'helper-unit-js':
    case 'adapter-unit-js':
    case 'serializer-unit-js':
    case 'service-unit-js':
    case 'initializer-unit-js':
      return 'Unit Test'

    case 'pod-component-integration-js':
    case 'component-integration-js':
    case 'route-integration-js':
    case 'controller-integration-js':
    case 'mixin-integration-js':
    case 'model-integration-js':
    case 'util-integration-js':
    case 'helper-integration-js':
    case 'adapter-integration-js':
    case 'serializer-integration-js':
    case 'service-integration-js':
    case 'initializer-integration-js':
      return 'Integration Test'
  }

  return typeKey
}

function findRelatedFiles (rootPath, filePath) {
  const type = detectType(rootPath, filePath)

  if (!type) { return [] }

  return getRelatedTypeKeys(type.key)
    .map((typeKey) => ({
      label: typeKeyToLabel(typeKey),
      path: getPath(type, typeKey)
    }))
    .filter(({ path: filePath }) => fs.existsSync(path.join(rootPath, filePath)))
}

async function findType (rootPath, type) {
  let files = []

  switch (type) {
    case 'adapter':
    case 'component':
    case 'controller':
    case 'helper':
    case 'initializer':
    case 'mixin':
    case 'model':
    case 'route':
    case 'serializer':
    case 'service':
    case 'util':
      files = await globItems(rootPath, `+(app|addon)/${type}s/**/*.js`)
      break
  }

  return files.map((filePath) => ({
    label: pathToLabel(type, filePath),
    path: filePath
  }))
}

function globItems (rootPath, pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, { cwd: rootPath }, (error, files) => {
      if (error) {
        return reject(error)
      }

      resolve(files)
    })
  })
}

// Deprecated exports
module.exports = (...args) => {
  console.log('[ember-find-related-files] Default export is deprecated. Use findRelatedFiles instead.')
  return findRelatedFiles(...args)
}

module.exports.findRelatedFiles = findRelatedFiles
module.exports.findType = findType

// Export for tests
module.exports.getRelatedTypeKeys = getRelatedTypeKeys
module.exports.detectType = detectType
module.exports.getPath = getPath
