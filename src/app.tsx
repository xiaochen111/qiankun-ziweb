/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-02-18 16:35:29
 * @LastEditTime: 2022-03-24 15:25:17
 * @LastEditors: Please set LastEditors
 * @Description:
 */

import type { RequestConfig } from 'umi';
import { errorHandler, requestInterceptors, responseInterceptors } from './app.config';

const isSubApp = (window as any).__POWERED_BY_QIANKUN__;

console.log('isSubApp: ', isSubApp);

// export function modifyClientRenderOpts(memo: any) {
//   console.log('memo: ', memo);
//   const root = document.querySelector('#sub-root');

//   console.log('root: ', root);
//   return {
//     ...memo,
//     rootElement: 'sub',
//     // rootElement: isSubApp ? 'sub-root' : memo.rootElement,
//   };
// }

export function rootContainer(container: any) {
  const root = document.querySelectorAll('#root');

  root[1]?.setAttribute('id', 'sub');
  return container;
}

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('app2 bootstrap', props);
    return {
      ...props,
      aa: 444,
    };
  },
  // 应用 render 之前触发
  async mount(props: any) {
    //     props.onGlobalStateChange((state, prev) => {
    //         // state: 变更后的状态; prev 变更前的状态
    //         console.log(state, prev);
    //       },true);
    //   console.log('app1 mount', props);
    //   props.setGlobalState({a:99})
    //   return {
    //       ...props,
    //       aa:33
    //   }
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('app1 unmount', props);
  },
};

//   let isSubApp = true;
// export function modifyClientRenderOpts(memo) {
//   return {
//     ...memo,
//     rootElement: isSubApp ? 'sub-root' : memo.rootElement,
//   };
// }
export const request: RequestConfig = {
  errorHandler, // 默认错误处理
  responseInterceptors: [responseInterceptors],

  requestInterceptors: [requestInterceptors],
  credentials: 'include', // 默认请求是否带上cookie
  prefix: '/gateway',
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        showType: 0,
      };
    },
  },
};
