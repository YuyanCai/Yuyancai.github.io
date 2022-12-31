import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from '@vuepress/plugin-search'
import { hopeTheme } from "vuepress-theme-hope";



export default defineUserConfig({
  base: "/",

  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    }),
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "小蔡coding",
      description: "A docs demo for vuepress-theme-hope",
    },
  },

  theme,

  shouldPrefetch: false,
});
