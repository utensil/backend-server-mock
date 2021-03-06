module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  env: {
    node: true,
    mocha: true
  },
  plugins: [
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // placing operators at the beginning of the line makes the code more readable
    'operator-linebreak': [2, 'before', { 'overrides': { '?': 'after' } }]
  },
  'globals': {
    '_': false,
    'fetch': false,
    '$': false
  }
};
