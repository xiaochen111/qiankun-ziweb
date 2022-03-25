/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-24 11:06:59
 * @Description:
 */
import type { BaseResult } from '@umijs/use-request/lib/types';

/**
 * 箱管分页对象
 */
export interface PagiationEquipmentType<T = any> {
  /** 返回的list */
  collection: T[];
  /** 当前页 */
  page: number;
  /** 每页的条数 */
  size: number;
  /** 总条数 */
  totalElements: number;
  /** 总页数 */
  totalPages: number;
}

/**
 * 箱管后端返回对象
 */
export interface ResponseResultEquipmentType<T = any> {
  /** 返回结果 */
  data: T;
  /** 请求是否成功 */
  success: boolean;
  /** 附加任务是否成功 */
  successAppend?: boolean;
  /** 返回信息 */
  msg?: string;
  seq?: number;
  msgAppend?: string;
}

/**
 * 箱管 后台校验返回类型
 */
export interface CheckOutType<T = any> {
  key: 'success' | 'failed';
  value: ResponseResultEquipmentType<T>[];
}

/**
 * 弹窗类型
 */
type ModalTypeEquipment = 'edit' | 'add' | 'detail' | 'copy';

/**
 * 弹窗属性
 */
export type ModalPropsEquipment<T = any, R = any> = {
  /** 弹窗类型 */
  type: ModalTypeEquipment;
  /** 弹窗回填指 */
  currentData?: T;
  /** 提交方法 */
  onOk?: Partial<Omit<Record<ModalTypeEquipment, (params: any) => Promise<ResponseResultEquipmentType<R>>>, 'detail'>>;
  /** 显示隐藏 */
  visible: boolean;
  setVisible: (b: boolean) => void;
};

/** 方法类型 */
type DefType = ModalTypeEquipment | 'confirm' | 'search';
/**
 * 弹窗属性 改进版（主要是方法对象不同）
 */
export type ModalPropsProEquipment<T = any, R = any> = Omit<ModalPropsEquipment<T>, 'onOk'> & {
  onOk?: Partial<Record<DefType, BaseResult<ResponseResultEquipmentType<R>, [data: any]>>>;
};
