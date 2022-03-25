/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-24 11:06:37
 * @Description:
 */
import type { PagiationEquipmentType, ResponseResultEquipmentType } from '@/service/equimentInterface';
import type { PagiationType, ResponseBlob, ResponseResultType } from '@/service/interface';
import { request as mRequest } from 'umi';
import type { RequestOptionsInit } from 'umi-request';

type Method = 'PUT' | 'POST' | 'DELETE' | 'GET' | 'UPLOAD';

/**
 * 小飞鱼模块
 * @param prefix
 * @returns
 */
export const moduleRequest = (prefix: string = '') => {
  /**
   * @param T 返回数据类型
   * @param K false不是分页 true
   */
  const requestCurrentModule = <T = any, K = false>(
    path: string,
    option?: RequestOptionsInit & {
      skipErrorHandler?: boolean;
      method?: Method;
    },
  ) => {
    type H = K extends true ? PagiationType<T> : T;

    return mRequest<ResponseResultType<H>>(prefix + path, option);
  };

  return requestCurrentModule;
};

/**
 * 小飞鱼返回到公共对象
 * @param T 返回数据类型
 * @param K false不是分页 true
 */
export const requestCommom = moduleRequest();

/**
 * 箱管模块
 * @param prefix
 * @returns
 */
export const moduleEquipmentRequest = (prefix: string) => {
  /**
   * @param T 返回数据类型
   * @param K false不是分页 true
   */
  const requestCurrentModule = <T = any, K = false>(
    path: string,
    option?: RequestOptionsInit & {
      skipErrorHandler?: boolean;
      method?: Method;
    },
  ) => {
    type H = K extends true ? PagiationEquipmentType<T> : T;
    return mRequest<ResponseResultEquipmentType<H>>(prefix + path, option);
  };

  return requestCurrentModule;
};

/**
 *  箱管返回到公共对象
 * @param T 返回数据类型
 * @param K false不是分页 true
 */
export const requestEquimentXhr = moduleEquipmentRequest('/container');

/**
 * 下载流
 */
export const requestBlob = (
  path: string,
  option: RequestOptionsInit & {
    skipErrorHandler?: boolean;
    method?: Method;
  },
) => mRequest<ResponseBlob>(path, option);
/**
 * 下载流
 */
export const requestBlobContainer = (
  path: string,
  option: RequestOptionsInit & {
    skipErrorHandler?: boolean;
    method?: Method;
  },
) => mRequest<ResponseBlob>(`/container${path}`, option);
