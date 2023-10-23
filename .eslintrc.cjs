module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    eqeqeq: "error",
    yoda: "error",
    curly: "error",

    "prettier/prettier": "error",

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
