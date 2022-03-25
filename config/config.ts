/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-02-18 16:37:31
 * @LastEditTime: 2022-03-24 11:35:14
 * @LastEditors: Please set LastEditors
 * @Description:
 */

import { defineConfig } from 'umi';
import proxy from './proxy';
import routers from './routers';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    // loading: '@ant-design/pro-skeleton',
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  publicPath: '/fclmodule/',
  // base:'/app1',
  antd: {
    compact: true,
  },
  routes: routers,
  locale: {},
  fastRefresh: {},
  qiankun: {
    slave: {},
  },
  proxy: proxy,
});
