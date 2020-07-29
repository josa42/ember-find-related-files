'use babel'

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { join } = require('path')

const groups = [
  ['indexed-pod-component-js', 'indexed-pod-component-template-hbs', 'indexed-pod-component-style-scss', 'indexed-pod-component-style-css', 'indexed-pod-component-style-sass', 'pod-component-js', 'pod-component-template-hbs', 'pod-component-style-css', 'pod-component-style-sass', 'pod-component-style-scss', 'pod-component-unit-js', 'pod-component-integration-js'],
  ['component-js', 'component-template-hbs', 'component-style-css', 'component-style-sass', 'component-style-scss', 'component-unit-js', 'component-integration-js'],
  ['controller-js', 'controller-template-hbs', 'route-js', 'controller-unit-js', 'controller-integration-js', 'route-unit-js', 'route-integration-js'],
  ['mixin-js', 'mixin-unit-js', 'mixin-integration-js'],
  ['model-js', 'model-unit-js', 'model-integration-js', 'adapter-js', 'adapter-unit-js', 'adapter-integration-js', 'serializer-js', 'serializer-unit-js', 'serializer-integration-js'],
  ['util-js', 'util-unit-js', 'util-integration-js'],
  ['helper-js', 'helper-unit-js', 'helper-integration-js'],
  ['service-js', 'service-unit-js', 'service-integration-js'],
  ['initializer-js', 'initializer-unit-js', 'initializer-integration-js']
].map(group => {
  const typescript = group.filter(i => i.endsWith('-js')).map(jsItem => jsItem.replace('-js', '-ts'))
  return group.concat(typescript)
})

const types = [
  { module: 'pod-component', exp: /^(app|addon|lib\/(?:.+)\/addon)\/components\/(.+)\/component\.(js|ts)$/ },
  { module: 'pod-component-template', exp: /^(app|addon|lib\/(?:.+)\/addon)\/components\/(.+)\/template\.(hbs)$/ },
  { module: 'pod-component-style', exp: /^(app|addon|lib\/(?:.+)\/addon)\/components\/(.+)\/style\.(css|sass|scss)$/ },
  { module: 'pod-component-unit', exp: /^()tests\/unit\/components\/(.+)\/component-test\.(js|ts)$/ },
  { module: 'pod-component-integration', exp: /^()tests\/integration\/components\/(.+)\/component-test\.(js|ts)$/ },
  { module: 'indexed-pod-component', exp: /^(app|addon|lib\/(?:.+)\/addon)\/components\/(.+)\/index\.(js)$/ },
  { module: 'indexed-pod-component-template', exp: /^(app|addon|lib\/(?:.+)\/addon)\/components\/(.+)\/index\.(hbs)$/ },
  { module: 'indexed-pod-component-style', exp: /^(app|addon|lib\/(?:.+)\/addon)\/components\/(.+)\/index\.(css|sass|scss)$/ },
  { module: 'component', exp: /^(app|addon|lib\/(?:.+)\/addon)\/components\/(.+)\.(js|ts)$/ },
  { module: 'component-template', exp: /^(app|addon|lib\/(?:.+)\/addon)\/templates\/components\/(.+)\.(hbs)$/ },
  { module: 'component-style', exp: /^(app|addon|lib\/(?:.+)\/addon)\/styles\/components\/(.+)\.(css|sass|scss)$/ },
  { module: 'component-unit', exp: /^()tests\/unit\/components\/(.+)-test\.(js|ts)$/ },
  { module: 'component-integration', exp: /^()tests\/integration\/components\/(.+)-test\.(js|ts)$/ },
  { module: 'route', exp: /^(app|addon|lib\/(?:.+)\/addon)\/routes\/(.+)\.(js|ts)$/ },
  { module: 'route-unit', exp: /^()tests\/unit\/routes\/(.+)-test\.(js|ts)$/ },
  { module: 'route-integration', exp: /^()tests\/integration\/routes\/(.+)-test\.(js|ts)$/ },
  { module: 'controller', exp: /^(app|addon|lib\/(?:.+)\/addon)\/controllers\/(.+)\.(js|ts)$/ },
  { module: 'controller-unit', exp: /^()tests\/unit\/controllers\/(.+)-test\.(js|ts)$/ },
  { module: 'controller-integration', exp: /^()tests\/integration\/controllers\/(.+)-test\.(js|ts)$/ },
  { module: 'controller-template', exp: /^(app|addon|lib\/(?:.+)\/addon)\/templates\/(.+)\.(hbs)$/ },
  { module: 'model', exp: /^(app|addon|lib\/(?:.+)\/addon)\/models\/(.+)\.(js|ts)$/ },
  { module: 'model-unit', exp: /^()tests\/unit\/models\/(.+)-test\.(js|ts)$/ },
  { module: 'model-integration', exp: /^()tests\/integration\/models\/(.+)-test\.(js|ts)$/ },
  { module: 'util', exp: /^(app|addon|lib\/(?:.+)\/addon)\/utils\/(.+)\.(js|ts)$/ },
  { module: 'util-unit', exp: /^()tests\/unit\/utils\/(.+)-test\.(js|ts)$/ },
  { module: 'util-integration', exp: /^()tests\/integration\/utils\/(.+)-test\.(js|ts)$/ },
  { module: 'helper', exp: /^(app|addon|lib\/(?:.+)\/addon)\/helpers\/(.+)\.(js|ts)$/ },
  { module: 'helper-unit', exp: /^()tests\/unit\/helpers\/(.+)-test\.(js|ts)$/ },
  { module: 'helper-integration', exp: /^()tests\/integration\/helpers\/(.+)-test\.(js|ts)$/ },
  { module: 'mixin', exp: /^(app|addon|lib\/(?:.+)\/addon)\/mixins\/(.+)\.(js|ts)$/ },
  { module: 'mixin-unit', exp: /^()tests\/unit\/mixins\/(.+)-test\.(js|ts)$/ },
  { module: 'mixin-integration', exp: /^()tests\/integration\/mixins\/(.+)-test\.(js|ts)$/ },
  { module: 'adapter', exp: /^(app|addon|lib\/(?:.+)\/addon)\/adapters\/(.+)\.(js|ts)$/ },
  { module: 'adapter-unit', exp: /^()tests\/unit\/adapters\/(.+)-test\.(js|ts)$/ },
  { module: 'adapter-integration', exp: /^()tests\/integration\/adapters\/(.+)-test\.(js|ts)$/ },
  { module: 'serializer', exp: /^(app|addon|lib\/(?:.+)\/addon)\/serializers\/(.+)\.(js|ts)$/ },
  { module: 'serializer-unit', exp: /^()tests\/unit\/serializers\/(.+)-test\.(js|ts)$/ },
  { module: 'serializer-integration', exp: /^()tests\/integration\/serializers\/(.+)-test\.(js|ts)$/ },
  { module: 'service', exp: /^(app|addon|lib\/(?:.+)\/addon)\/services\/(.+)\.(js|ts)$/ },
  { module: 'service-unit', exp: /^()tests\/unit\/services\/(.+)-test\.(js|ts)$/ },
  { module: 'service-integration', exp: /^()tests\/integration\/services\/(.+)-test\.(js|ts)$/ },
  { module: 'initializer', exp: /^(app|addon|lib\/(?:.+)\/addon)\/initializers\/(.+)\.(js|ts)$/ },
  { module: 'initializer-unit', exp: /^()tests\/unit\/initializers\/(.+)-test\.(js|ts)$/ },
  { module: 'initializer-integration', exp: /^()tests\/integration\/initializers\/(.+)-test\.(js|ts)$/ }
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
  const [, , pod, type, , subtype, ext] = typeKey.match(/^((indexed-pod|pod)-)?([a-z]+)(-([a-z]+))?-([a-z]+)$/)

  if (pod) {
    const indexed = pod === 'indexed-pod'
    switch (subtype) {
      case 'integration':
      case 'unit':
        return `tests/${subtype}/${type}s/${part}/${type}-test.${ext}`
      default:
        let fileName = subtype || type
        if (indexed) fileName = 'index'
        return `${hostType}/components/${part}/${fileName}.${ext}`
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
    case 'indexed-pod-component-js':
    case 'pod-component-js':
    case 'component-js':
    case 'component-ts':
      return 'Component'

    case 'indexed-pod-component-style-scss':
    case 'pod-component-style-scss':
    case 'indexed-pod-component-style-sass':
    case 'pod-component-style-sass':
    case 'indexed-pod-component-style-css':
    case 'pod-component-style-css':
    case 'component-style-scss':
      return 'Stylesheet'

    case 'route-js':
    case 'route-ts':
      return 'Route'

    case 'controller-js':
    case 'controller-ts':
      return 'Controller'

    case 'mixin-js':
    case 'mixin-ts':
      return 'Mixin'

    case 'model-js':
    case 'model-ts':
      return 'Model'

    case 'util-js':
    case 'util-ts':
      return 'Util'

    case 'helper-js':
    case 'helper-ts':
      return 'Helper'

    case 'adapter-js':
    case 'adapter-ts':
      return 'Adapter'

    case 'serializer-js':
    case 'serializer-ts':
      return 'Serializer'

    case 'service-js':
    case 'service-ts':
      return 'Service'

    case 'initializer-js':
    case 'initializer-ts':
      return 'Initializer'

    case 'indexed-pod-component-template-hbs':
    case 'pod-component-template-hbs':
    case 'component-template-hbs':
    case 'controller-template-hbs':
      return 'Template'

    case 'indexed-pod-component-unit-js':
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
    case 'component-unit-ts':
    case 'route-unit-ts':
    case 'controller-unit-ts':
    case 'mixin-unit-ts':
    case 'model-unit-ts':
    case 'util-unit-ts':
    case 'helper-unit-ts':
    case 'adapter-unit-ts':
    case 'serializer-unit-ts':
    case 'service-unit-ts':
    case 'initializer-unit-ts':
      return 'Unit Test'

    case 'indexed-pod-component-integration-js':
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
    case 'component-integration-ts':
    case 'route-integration-ts':
    case 'controller-integration-ts':
    case 'mixin-integration-ts':
    case 'model-integration-ts':
    case 'util-integration-ts':
    case 'helper-integration-ts':
    case 'adapter-integration-ts':
    case 'serializer-integration-ts':
    case 'service-integration-ts':
    case 'initializer-integration-ts':
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
      files = await globItems(rootPath, `+(app|addon)/${type}s/**/*.+(js|ts)`)
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
