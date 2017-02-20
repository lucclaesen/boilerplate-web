# Test setup

This took some experimenting to get everything in place without too much magic. But in the end, the result is fairly simple.

The golden tip came from an answer by Eric Clemmons on https://github.com/mochajs/mocha/issues/2448.

## Testing with Mocha in the browser.

In browser testing is interesting in several respects: imagine a setup in which your browser loads both your app and, on another tap, the test results. This can be
easily realized if both the start and browser test scripts are run.

- With live reloading, upon every recompile of the bundle, the test page will be releoaded;
- With HMR, it gets even better: then only the tests are run that are changed with respect to the previous save.

In browser testing is very useful for debugging: you can use the built in debugger of the browser to debug a failing test.

In-browser-testing means that mocha is run on the client (in the browser). I.e. our development server generates an html file with a direct script reference to the
mocha test runner (through CDN). This will start the runner one page load.

Of course, Mocha needs tests to execute. These are provided in a dedicated test bundle. Mocha is not referenced at all from inside this bundle.

- One should never reference mocha -- it's a runner, not a library package (whereas Chai is a lib and should be referenced). Eslint warnings might prompt you to do so. 
But thanks to https://github.com/feross/standard/issues/122. Fixing these linter warnings is simple: add an .eslintrc.json file in the tests folder with mocha 
in the env.
- The bundle served to the mocha runner should contain all tests, and via the dependencies of the tests on our app code, the latter will be automatically included. The key
to all this is to instruct webpack to take the appropriate entry point: a file that dynamically requires all tests. This special entry point is ~/tests.index.js.
- The bundle is not stored to disk, but served from memory by means of webpack-dev-server.
- The only plugin that's need is the well-known htmlplugin (no mocha-webpack or anything else): this makes sure that the mocha html page is emitted with the bundle. The
template for generating this html file makes sure that mocha styles and js are linked from a cdn.
- Equally important is to neutralize all webpack features that mocha cannot understand, such as bundling image and style assets. For this, null-loaders are used.

As one can see, we have a very simple browser-test configuration of webpack to support all of this.

## Node testing

In browser testing is great, but has one disadvantage: it does not allow integration in a continuous integration scenario, i.e. in a mature automation scenario in which, e.g.
a commit is not allowed if one of the tests fail.

The only way to accomplish such a goal is to run the tests on the development or build machine within a node process.

In this setup, we bypass webpack completely (since it targets browsers). The key element from this setup:
- an npm script node-test that calls mcoha with a testsetup.js and a glob for test files
- the responsability of the setup.js file is to
    - activate the transipler for es2015 and stage-0
    - disable non-supported requires of styles and images.
    - eventually: setup jsdom
    