
// Register babel to transpile before tests are run
require ("babel-register")();


// Disable webpack features that Mocha does not understand
require.extensions[".css"] = function() {};

// aidtionally, setup jsdom here if needed ..