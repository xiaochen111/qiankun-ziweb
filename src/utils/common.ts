import type { FormItemProps } from 'antd';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useAliveController } from 'react-activation';
import { useHistory } from 'react-router';

/**
 * 去除当前缓存的页面
 * @param cachePath
 */
export const useDropScopeCachePath = (cachePath: string | RegExp) => {
  const { getCachingNodes, dropScope } = useAliveController();
  const history = useHistory();
  const cachingNodes = getCachingNodes();
  const hasCache = cachingNodes.some((item) =>
    typeof cachePath === 'string'
      ? item.name === cachePath
      : (cachePath as RegExp).test(item.name!),
  );

  const dropCache = useCallback(() => {
    if (hasCache) {
      return dropScope(cachePath);
    }
    return Promise.resolve();
  }, [hasCache]);

  const dropCurrentCache = useCallback(() => {
    const unlisten = history.listen(() => {
      if (unlisten) {
        unlisten();
      }
      setTimeout(() => {
        dropScope(cachePath);
      }, 60);
    });
  }, []);

  return {
    dropCache,
    dropCurrentCache,
  };
};

/** 递归查找路由数组 */
const getRouteItem: any = (list: any[], path: string) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of list || []) {
    if (item.path === path) return item;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const item2 = getRouteItem(item.routes, path);

    if (item2) return item2;
  }
};

/**
 * 下载文件
 * @param fileName
 * @param blob
 */
export const downLoadFile = (fileName: string, blob: Blob) => {
  if (!fileName || !blob) return;
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * 对象深合并
 * @param array
 * @param value
 * @param data
 */
export const ObjectDeepMerge = (
  paths: FormItemProps['name'],
  value: string,
  data = {},
) => {
  const arr = Array.isArray(paths) ? paths : [paths];
  const len = arr.length - 1;

  arr.reduce((current: any, key: any, index: number) => {
    if (!current[key]) {
      current[key] = {};
    }
    if (index === len) {
      current[key] = value;
    }

    return current[key];
  }, data);

  return data;
};

/**
 * 金额千分位以及保留两位小数
 * @param value
 */
export const toThousands = (value: string | number) => {
  let num: any = Number(value);

  if (Number.isNaN(num)) return value;
  num = num.toFixed(2).toString();
  const numArr = num.split('.');
  let num1 = numArr[0];
  let result = '';

  while (String(Math.abs(num1)).length > 3) {
    result = `,${num1.slice(-3)}${result}`;
    num1 = num1.slice(0, num1.length - 3);
  }
  if (num1) {
    result = num1 + result;
  }
  return `${result}.${numArr[1]}`;
};

/** 汇率兑换 其他币种兑换人民币 */
export const OTHER_CUR_TO_CNY_ID = '1400011221025026053';
/** 管理员userId */
export const ADMIN_USER_ID = '1';
/** 网服-订舱中心 租户id */
export const WEB_SERVER_ID = '6';

export enum TimeFormateType {
  YMD = 'YYYY-MM-DD',
  YMDHm = 'YYYY-MM-DD HH:mm',
  YMDHms = 'YYYY-MM-DD HH:mm:ss',
}
/** 后端返回的时间字符串转换前端想要的格式 */
export const transformTimeDate = (
  value: string | undefined,
  timeFormate: TimeFormateType = TimeFormateType.YMD,
): string => {
  if (!value) return '';
  return dayjs(value).format(timeFormate);
};
