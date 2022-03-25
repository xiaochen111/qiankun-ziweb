/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-01-19 11:46:28
 * @LastEditTime: 2022-01-20 13:44:26
 * @Date: 2021-12-21 11:01:04
 * @LastEditTime: 2022-01-18 15:06:59
 * @LastEditors: chenhaibo-chb0413@163.com
 * @Description:
 */
export const UA = '/ua';
export const BASIC = '/basic';
export const ORDER = '/order';
export const FIN = '/fin';
export const EXCHANGE = '/exchange';

const proxy = {
  '/gateway': {
    // target: 'http://10.52.96.93:9080',
    // target: 'http://121.42.157.168:9080',
    target: 'http://120.77.234.251:9006/',
    // target: 'http://10.139.60.158:9080/',
    // target: 'https://wetrans.cimc.cn',
    // target: 'http://10.53.4.113:9080',
    changeOrigin: true,
  },
  '/fr/': {
    target: 'http://192.168.93.14:5005/',
    changeOrigin: true,
    pathRewrite: { '^/fr': '' },
  },
};

export default proxy;

// http://120.79.156.135:9084/doc.html //ua
// http://120.79.156.135:9085/doc.html //basic
// http://120.79.156.135:9086/doc.html //order
// http://120.79.156.135:9090/doc.html //file
// http://120.79.156.135:9087/doc.html //node
// http://120.79.156.135:9089/doc.html //bank
// http://120.79.156.135:9088/doc.html //fin
// http://120.77.234.251:9096/doc.html //exchange
