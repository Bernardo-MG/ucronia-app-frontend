const js = require('@eslint/js');
const angular = require('angular-eslint');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const componentFields = require('./eslint/component-fields.cjs');

const appTypescript = ['src/**/*.ts'];
const prefixes = [
  'account', 'access', 'assoc', 'app', 'authentication', 'login', 'edition', 'button',
  'icon', 'layout', 'menu', 'pagination', 'shared', 'sorting', 'form', 'frontpage', 'widget'
];

module.exports = [
  { ...js.configs.recommended, files: appTypescript, ignores: ['**/calendar-month.component.ts'] },
  ...typescript.configs['flat/recommended'].map(config => ({
    ...config,
    files: appTypescript,
    ignores: ['**/calendar-month.component.ts']
  })),
  {
    files: appTypescript,
    ignores: ['**/calendar-month.component.ts'],
    processor: angular.processInlineTemplates,
    plugins: { '@angular-eslint': angular.tsPlugin },
    rules: {
      ...Object.assign({}, ...angular.configs.tsRecommended.map(config => config.rules)),
      // Angular's v22 migration uses Eager to preserve existing component behavior.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: prefixes, style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: prefixes, style: 'kebab-case' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },
  {
    files: ['src/**/*.ts', 'projects/**/*.ts'],
    languageOptions: { parser: typescriptParser },
    plugins: { local: { rules: { 'component-fields': componentFields } } },
    rules: { 'local/component-fields': 'error' }
  },
  {
    files: ['src/**/*.html'],
    languageOptions: { parser: angular.templateParser },
    plugins: { '@angular-eslint/template': angular.templatePlugin },
    rules: Object.assign({}, ...angular.configs.templateRecommended.map(config => config.rules))
  },
  { files: ['projects/**/*.html'], languageOptions: { parser: angular.templateParser } }
];
