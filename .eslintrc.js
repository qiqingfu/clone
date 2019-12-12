module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint-config-airbnb-base",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "padded-blocks": ["error", "always", { allowSingleLineBlocks: true }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "one-var": ["error", "never"],
    "no-cond-assign": ["error", "except-parens"],
    "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"],
  }
};
