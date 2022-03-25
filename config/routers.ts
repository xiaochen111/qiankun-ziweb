/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-24 10:13:23
 * @Description:
 */

const routersInner = [
  {
    path: '/manger',
    name: '运价管理',
    component: '@/pages/freight/manger',
    id: 33301,
    parentId: 333,
  },
  {
    path: '/view',
    name: '运价查询',
    component: '@/pages/freight/manger/view',
    id: 33302,
    parentId: 333,
  },
  { path: '/aa', component: '@/pages/index' },
];

const addWarpper = (routers: any) => {
  routers.forEach((item: any) => {
    if (item.routes) {
      addWarpper(item.routes);
    } else if (item.layout !== false) {
      item.wrappers = ['@/watchGlobalData/index'];
    }
  });
};

addWarpper(routersInner);

const routers = [
  {
    path: '/',
    flatMenu: true,
    component: '@/Layout',
    routes: routersInner,
  },
];

export default routers;
