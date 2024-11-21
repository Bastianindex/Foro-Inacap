module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true, // Si estás usando Mocha para pruebas
  },
  parserOptions: {
    ecmaVersion: 2020, // Actualiza a la versión de ECMAScript que necesites
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};