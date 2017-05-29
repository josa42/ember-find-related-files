# ember-find-related-files

Find related files in an EmberJS project directory.

## Usage

```JavaScript
import findRelatedFiles from 'ember-find-related-files'

findRelatedFiles('/Users/josa/g/my-app', 'app/components/my-component.js')
// => [
//   { label: 'Template',  path: 'app/templates/components/my-component.hbs' },
//   { label: 'Unit test', path: 'tests/unit/components/my-component-test.js' }
// ]

```

Support library for:

- [vscode-ember-related-files](https://github.com/josa42/vscode-ember-related-files)
- [atom-ember-related-files](https://github.com/josa42/atom-ember-related-files)

## License

[The MIT License](LICENSE.md)
