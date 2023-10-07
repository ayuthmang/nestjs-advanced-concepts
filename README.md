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
