# ember-find-related-files

[![](https://img.shields.io/npm/v/ember-find-related-files.svg)](https://www.npmjs.com/package/ember-find-related-files)
[![](https://travis-ci.org/josa42/ember-find-related-files.svg?branch=master)](https://travis-ci.org/josa42/ember-find-related-files)

Find related files in an EmberJS project directory.

## Usage

```Bash
npm install ember-find-related-files
```

```JavaScript
import findRelatedFiles from 'ember-find-related-files'

findRelatedFiles('/Users/josa/g/my-app', 'app/components/my-component.js')
// => [
//   { label: 'Template',  path: 'app/templates/components/my-component.hbs' },
//   { label: 'Unit test', path: 'tests/unit/components/my-component-test.js' }
// ]


findType('/Users/josa/g/my-app', 'component')
// => [
//   { label: 'my-component',  path: 'app/templates/components/my-component.hbs' }
// ]

```

Support library for:

- [vscode-ember-related-files](https://github.com/josa42/vscode-ember-related-files)
- [atom-ember-related-files](https://github.com/josa42/atom-ember-related-files)

## License

[The MIT License](LICENSE.md)
