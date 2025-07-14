import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
   { ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'], },
   pluginVue.configs['flat/recommended'],
   vueTsConfigs.recommended,
   {
      rules: {
         "no-trailing-spaces": "error",
         "indent": ["error", 3, { "SwitchCase": 1 }],
         "vue/html-closing-bracket-newline": ["error", { "singleline": "never", "multiline": "never" }],
         "vue/first-attribute-linebreak": ["error", { "singleline": "beside", "multiline": "beside" }],
         'vue/multi-word-component-names': 'off',
         '@typescript-eslint/no-explicit-any': 'warn',
      }
   },
)