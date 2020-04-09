# Install

`npm install webpack4-lib`

# Dependencies

-   lodash
-   mockjs

# Usage

## Browser

```html
<script src="../node_modules/lodash/lodash.js"></script>
<script src="../node_modules/mockjs/dist/mock.js"></script>
<script src="../node_modules/webpack4-lib/dist/webpack4-lib.umd.js"></script>
<script>
    webpack4Lib.method1();
</script>
```

## Node.js

```javascript
const webpack4Lib = require('webpack4-lib');

webpack4Lib.method1();
```

## Webpack

```javascript
import webpack4Lib from 'webpack4-lib';
// or
// import webpack4Lib from 'webpack4-lib/dist/webpack4-lib.cjs';

webpack4Lib.method1();
```

## RequireJs

### Ues with lodash-amd package

```html
<script src="../node_modules/requirejs/require.js"></script>
<script>
    require.config({
        baseUrl: '..',
        paths: {
            // use lodash-amd
            lodash: 'node_modules/lodash-amd',
            mockjs: 'node_modules/mockjs/dist/mock',
            webpack4Lib: 'node_modules/webpack4-lib/dist/webpack4-lib.umd',
        },
    });
</script>
<script>
    require(['webpack4Lib'], function (webpack4Lib) {
        webpack4Lib.method1();
    });
</script>
```

### Ues with lodash package

```html
<!-- whether or not use core-js library depends on your browser environment -->
<!-- <script src="../node_modules/core-js-bundle/minified.js"></script> -->
<script src="../node_modules/requirejs/require.js"></script>
<script src="../node_modules/webpack4-lib/dist/webpack4-lib.umd.help.js"></script>
<script>
    require.config({
        baseUrl: '..',
        paths: {
            // use whole lodash library
            lodash: 'node_modules/lodash/lodash',
            mockjs: 'node_modules/mockjs/dist/mock',
            webpack4Lib: 'node_modules/webpack4-lib/dist/webpack4-lib.umd',
        },
    });
</script>
<script>
    require(['webpack4Lib'], function (webpack4Lib) {
        webpack4Lib.method1();
    });
</script>
```
