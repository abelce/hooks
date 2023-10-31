import { defineConfig } from 'dumi';
import path from 'path';
import { RELEASE_LINK } from './config';

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
          link: RELEASE_LINK,
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
          link: RELEASE_LINK,
        },
      ],
    },
    prefersColor: { default: 'auto', switch: true },
    socialLinks: {
      github: 'https://github.com/abelce/hooks',
    },
    footer: false,
    showLineNum: true,
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
        inline: true,
      })
      .end()
      .before('jsx-ts-tsx');
  },
  analytics: {
    // google analytics 的 key (GA 4)
    ga_v2: 'G-LCCE2HPTRR',
    // 若你在使用 GA v1 旧版本，请使用 `ga` 来配置
    //  ga: 'ga_old_key',

    // 百度统计的 key
    baidu: '96e16d5ad305b33a91c764b493ee07bf',
  },
  sitemap: {
    hostname: 'https://let-hooks.vwood.xyz',
  },
});
