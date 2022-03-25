/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-03 15:49:02
 * @LastEditTime: 2022-03-24 17:43:51
 * @LastEditors: Please set LastEditors
 * @Description:
 */
import type { BaseResult } from '@umijs/use-request/lib/types';
/**
 * 后端返回类型
 */
export interface ResponseResultType<T = any> {
  /** 返回结果 */
  data: T | null;
  /** 请求是否成功 */
  success: boolean;
  /** 返回信息 */
  msg?: string;
  /** 请求编码，code为0代表的是成功，其他都是失败！ */
  code: '999999' | '100000' | '401' | 401;
  /** 版本号 */
  version: string;
}

/**
 * 下载返回类型
 */
export interface ResponseBlob {
  fileName: string;
  blob: Blob;
}

/**
 * 分页对象
 */
export interface PagiationType<T = any> {
  current: number;
  pages: number;
  /** 返回的list */
  records: T[];
  searchCount: boolean;
  /** 每页的条数 */
  pageSize: number;
  /** 每页的条数 */
  size: number;
  total: number;
}

/**
 * 弹窗类型
 */
export type ModalType = 'edit' | 'add' | 'detail' | 'copy' | 'update';
/**
 * 弹窗属性
 */
export type ModalProps<T = any, R = any> = {
  /** 弹窗类型 */
  type: ModalType;
  /** 弹窗回填指 */
  currentData?: T;
  /** 提交方法 */
  onOk?: Partial<Omit<Record<ModalType, (params: any) => Promise<ResponseResultType<R>>>, 'detail'>>;
  /** 显示隐藏 */
  visible: boolean;
  setVisible: (b: boolean) => void;
};

/** 方法类型 */
export type DefType = ModalType | 'drop';
/**
 * 弹窗属性 改进版（主要是方法对象不同）
 */
export type ModalPropsPro<T = any, R = any> = Omit<ModalProps<T>, 'onOk'> & {
  onOk?: Partial<Record<DefType, BaseResult<ResponseResultType<R>, [data: any]>>>;
};
