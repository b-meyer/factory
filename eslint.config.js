import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  { ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'], },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  { rules: {
      "vue/html-closing-bracket-newline": [ "error", { "singleline": "never", "multiline": "never" } ],
      "vue/first-attribute-linebreak": ["error", { "singleline": "beside", "multiline": "beside" }],
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
  } },
]
