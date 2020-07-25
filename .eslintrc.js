module.exports = {
    plugins: ['jest', '@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    extends: [
        'eslint:recommended',

        // Adds recommended jest rules
        'plugin:jest/recommended',

        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',

        // Uses eslint-config-prettier to disable ESLint rules from
        // @typescript-eslint/eslint-plugin that would conflict with prettier
        'prettier/@typescript-eslint',

        // Enables eslint-plugin-prettier and eslint-config-prettier. This will
        // display prettier errors as ESLint errors. Make sure this is always
        // the last configuration in the extends array.
        'plugin:prettier/recommended',
    ],
    rules: {
        // disable the rule for all files
        '@typescript-eslint/explicit-function-return-type': 'error',
    },
};
