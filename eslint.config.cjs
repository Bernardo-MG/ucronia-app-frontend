const js = require('@eslint/js');
const angular = require('@angular-eslint/eslint-plugin');
const template = require('@angular-eslint/eslint-plugin-template');
const templateParser = require('@angular-eslint/template-parser');
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
    processor: template.processors['extract-inline-html'],
    plugins: { '@angular-eslint': angular },
    rules: {
      ...angular.configs.recommended.rules,
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
    languageOptions: { parser: templateParser },
    plugins: { '@angular-eslint/template': template },
    rules: template.configs.recommended.rules
  },
  { files: ['projects/**/*.html'], languageOptions: { parser: templateParser } }
];
