const {
    defineConfig,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");
const typescriptEslintEslintPlugin = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.eslint.json"],
        },

        globals: {
            ...globals.jest,
            ...globals.node,
            ...globals.browser,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslintEslintPlugin,
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ),

    rules: {
        "semi": "off",
        "@typescript-eslint/no-explicit-any": "error",

        "no-multiple-empty-lines": ["error", {
            "max": 1,
            "maxEOF": 0,
        }],
    },
}, {
    files: ["examples/*.js"],

    languageOptions: {
        parserOptions: {
            project: null,
        },
    },

    rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
    },
}]);
