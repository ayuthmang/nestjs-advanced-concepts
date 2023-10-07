## Debugging Common Errors

Find circular dependency by

```bash
// ▪ Terminal - Use Madge to look for circular dependencies
npx madge dist/main.js --circular
// To generate image of graph
npx madge dist/main.js --image graph.png
```

If found error

```
➜  nestjs-advanced-concepts git:(main) ✗ npx madge dist/main.js --image graph.png
Processed 9 files (412ms)


✖ Error: Graphviz could not be found. Ensure that "gvpr" is in your $PATH. Error: spawn gvpr ENOENT
```

try to install graphviz by

`$ brew install graphviz`

## All about NestJS Schematics - Adding Custom Schematics

```typescript

// ⚙️ Terminal - generate blank schematic using npx
npx @angular-devkit/schematics-cli blank --name=schematics
/** Note: we're going to use npx here,
 *  but note that alternatively - you could install the "@angular-devkit/schematics-cli" package globally
 *  and refer to it as "schematics" instead of using npx - if you prefer.
 **/

// 🏗 Install required dev dependency
npm i @schematics/angular -D

// 🏗 Build the app in "watch" mode
npm run build -- --watch

// ⚙️ Terminal - TO EXECUTE THE SCHEMATIC (when you are ready)
npx @angular-devkit/schematics-cli ./schematics:configurable-module
// NOTE: --debug=false (needed to actually "run" it), it is debug=true by default

// ----------
// 📝 FINAL - schematics collections.json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "configurable-module": {
      "description": "Generates a configurable module.",
      "factory": "./configurable-module/index#generate",
      "schema": "./configurable-module/schema.json"
    }
  }
}


// ----------
// 📝 FINAL - index.ts (configurable-module)
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  strings,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { findNodes, insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

interface ConfigurableModuleSchematicOptions {
  name: string;
}

function updateModuleFile(
  tree: Tree,
  options: ConfigurableModuleSchematicOptions,
): Tree {
  const name = dasherize(options.name);
  const moduleFilePath = `src/${name}/${name}.module.ts`;
  const moduleFileContent = tree.readText(moduleFilePath);
  const source = ts.createSourceFile(
    moduleFilePath,
    moduleFileContent,
    ts.ScriptTarget.Latest, // use the latest TypeScript version
    true,
  );
  const updateRecorder = tree.beginUpdate(moduleFilePath);
  const insertImportChange = insertImport(
    source,
    moduleFilePath,
    'ConfigurableModuleClass',
    `./${name}.module-definition`,
  );
  if (insertImportChange instanceof InsertChange) {
    updateRecorder.insertRight(
      insertImportChange.pos,
      insertImportChange.toAdd,
    );
  }
  const classNode = findNodes(source, ts.SyntaxKind.ClassDeclaration)[0];
  updateRecorder.insertRight(
    classNode.end - 2,
    'extends ConfigurableModuleClass ',
  );
  tree.commitUpdate(updateRecorder);

  return tree;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generate(options: ConfigurableModuleSchematicOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({ ...options, ...strings }),
      move('src'),
    ]);

    return chain([
      externalSchematic('@nestjs/schematics', 'module', {
        name: options.name,
      }),
      mergeWith(templateSource),
      (tree) => updateModuleFile(tree, options),
    ]);
  };
}

// ----------
// 📝 FINAL - files / __name@dasherize__.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';

export const { ConfigurableModuleClass } =
  new ConfigurableModuleBuilder().build();

// ----------
// 📝 FINAL - schema.json
{
  "$schema": "http://json-schema.org/schema",
  "$id": "configurable-module",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the module.",
      "$default": {
        "$source": "argv",
        "index": 0
      },
      "x-prompt": "What name would you like to use for the module?"
    }
  },
  "required": ["name"]
}
```

`$ npx @angular-devkit/schematics-cli ./schematics:configurable-module`
`$ npx @angular-devkit/schematics-cli ./schematics:configurable-module --debug=false`
