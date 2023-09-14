import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'zhooks',
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
    sidebar: {
      // '/': [
      //   {
      //     title: 'Home',
      //     path: 'index',
      //     children: [],
      //   },
      // ],
      // '/hooks': hooksMenus,
    },
    prefersColor: { default: 'auto', switch: true },
    socialLinks: {
      github: 'https://github.com/abelce/hooks',
    },
  },
  title: 'zhooks',
  alias: {
    zhooks: path.resolve(__dirname, './packages/hooks/src'),
    // "@zhooks": path.resolve(__dirname, './packages/hooks/src'),
    // '@dumiDemo': path.resolve(__dirname, './docs/demos'),
  },
  resolve: {
    docDirs: ['docs', 'packages/hooks/src'],
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
});
