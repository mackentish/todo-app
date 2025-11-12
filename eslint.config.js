// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
    { ignores: ['dist', 'node_modules', 'eslint.config.js'] },

    js.configs.recommended,

    // TypeScript + React rules
    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
        ...cfg,
        languageOptions: {
            ...cfg.languageOptions,
            parserOptions: {
                ...cfg.languageOptions?.parserOptions,
                project: ['./tsconfig.app.json', './tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.es2024,
            },
        },
    })),

    {
        plugins: {
            react: reactPlugin,
            'react-hooks': hooks,
            'jsx-a11y': a11y,
        },
        rules: {
            'react/react-in-jsx-scope': 'off', // not needed with Vite
            'react/jsx-uses-react': 'off',
            ...hooks.configs.recommended.rules,
            ...a11y.configs.recommended.rules,
        },
        settings: {
            react: { version: 'detect' },
        },
    },

    // Keep ESLint and Prettier from fighting
    prettier,
];
