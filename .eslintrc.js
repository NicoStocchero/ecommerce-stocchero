module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "react-native", "react-hooks", "react-refresh"],
  rules: {
    // React Native specific rules
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 0, // Disable this for React Native
    "react-native/no-single-element-style-arrays": 2,

    // React rules
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/prop-types": "off", // Disable if not using PropTypes
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],

    // Import rules
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off", // Disable for React Native
    "import/extensions": "off",

    // General rules
    "no-console": "warn",
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error",

    // Indentation and formatting
    indent: ["error", 2],
    "linebreak-style": "off", // Disable for Windows compatibility
    quotes: "off",
    semi: ["error", "always"],
    "comma-dangle": "off",

    // React Refresh
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/jsx-one-expression-per-line": "off",
    "max-len": ["error", { code: 100 }],
    "operator-linebreak": ["off"],
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "arrow-body-style": "off",
    "no-use-before-define": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "node_modules/",
    "*.config.js",
    "metro.config.js",
    "babel.config.js",
  ],
};
