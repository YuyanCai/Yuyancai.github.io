import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  {text: '主页', link: '/',icon: "home"},
  {text: '前端', link: '/front/Vue/',icon: "javascript"},
  {text: '后端', link: '/Java/',icon: "java"},
  {text: '运维', link: '/devops/',icon: "centos"},
  {text: 'Mysql', link: '/mysql/',icon: "more"},
  {text: 'Redis', link: '/redis/',icon: 'launch'},
  {
    text: '项目实战',
    children: [
      {text: '谷粒学院', link: '/study-project/school/'},
      {text: '谷粒商城', link: '/study-project/mall/'},
      {text: '黑马点评', link: '/study-project/evaluate/'},
      {text: '探花交友', link: '#'},
      {text: '黑马头条', link: '#'},
      {text: '品达物流TMS', link: '#'},
      {text: '智牛股', link: '#'},
      {text: '亿可控', link: '#'},
      {text: '开源项目', link: '#'},
    ],
    icon: 'hot',
  },
  {
    text: '学习中遇到的问题',
    children: [
      {text: 'MAC使用IDEA小技巧', link: '/mac/idea'},
      {text: 'Linux使用小技巧', link: '/mac/linux'}
    ],
    icon: "linux"
  },
]);
