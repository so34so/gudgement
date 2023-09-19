module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "@react-native-community",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "@tanstack/query",
  ],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double", { avoidEscape: true }],
    "react/react-in-jsx-scope": "off",
    semi: ["error", "always"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-empty-function": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-namespace": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/prefer-query-object-syntax": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
