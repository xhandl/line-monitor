// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import boundaries from 'eslint-plugin-boundaries';

export default defineConfig(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: { boundaries },
    settings: {
      // Required: without it, aliases (@core/*, ...) and extensionless .ts imports don't resolve
      // and boundaries silently reports nothing.
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      // Architectural areas. Root files in src/app (app.ts, app.routes.ts, ...) may import anything.
      'boundaries/elements': [
        { type: 'core', pattern: 'src/app/core' },
        { type: 'layout', pattern: 'src/app/layout' },
        { type: 'shared', pattern: 'src/app/shared' },
        { type: 'feature', pattern: 'src/app/features/*', capture: ['name'] },
      ],
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'core' } },
              allow: { to: { element: { type: 'shared' } } },
            },
            {
              from: { element: { type: 'layout' } },
              allow: { to: { element: { types: { anyOf: ['core', 'shared'] } } } },
            },
            {
              from: { element: { type: 'feature' } },
              allow: { to: { element: { types: { anyOf: ['core', 'shared'] } } } },
            },
            // A feature may import only its own files, never another feature.
            {
              from: { element: { type: 'feature' } },
              allow: {
                to: {
                  element: {
                    type: 'feature',
                    captured: { name: '{{ from.element.captured.name }}' },
                  },
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
);
