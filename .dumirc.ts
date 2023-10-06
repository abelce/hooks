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
          link: '/hooks/use-update',
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
          link: '/hooks/use-update',
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
    footer: false,
  },

  title: 'let-hooks',
  alias: {
    'let-hooks': path.resolve(__dirname, './src'),
  },
  apiParser: {},
  resolve: {
    docDirs: ['docs', './src'],
    entryFile: './src/index.ts',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    // { id: 'en-US', name: 'English' },
  ],
  metas: [{ name: 'keywords', content: 'let-hooks, react, hooks' }],
  chainWebpack: (memo) => {
    memo.module
      .rule('worker')
      .test(/\.worker\.ts$/)
      .use('worker-loader')
      .loader('worker-loader')
      .options({
        inline: "fallback",
      })
      .end();
  },
});
