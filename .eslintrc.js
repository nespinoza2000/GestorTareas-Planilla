module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    ],
    env: {
        browser: true,  // Reconoce variables globales del navegador
        node: true,     // Reconoce variables globales de Node.js, como 'process'
    },
};
