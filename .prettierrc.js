module.exports = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'all',
  
  // Indentation and spacing
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  
  // JavaScript/TypeScript specific
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  
  // Other formatting
  endOfLine: 'lf',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto',
  
  // File-specific overrides
  overrides: [
    {
      files: '*.{json,md,yml,yaml}',
      options: {
        tabWidth: 2,
      },
    },
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
