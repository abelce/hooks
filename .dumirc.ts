import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'let-hooks',
    nav: {
      'zh-CN': [
        {
          title: '指南',
          link: '/guide',
        },
        {
          title: 'hooks',
          link: '/hooks',
        },
        {
          title: '更新日志',
        },
      ],
      'en-US': [
        {
          title: 'Guide',
          link: '/guide',
        },
        {
          title: 'Hooks',
          link: '/hooks',
        },
        {
          title: 'Releases',
        },
      ],
    },
    prefersColor: { default: 'auto', switch: true },
    socialLinks: {
      github: 'https://github.com/abelce/hooks',
    },
  },
  title: 'let-hooks',
  alias: {
    'let-hooks': path.resolve(__dirname, './packages/hooks/src'),
  },
  apiParser: {},
  resolve: {
    docDirs: ['docs', 'packages/hooks/src'],
    entryFile: './packages/hooks/src/index.ts',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
});
