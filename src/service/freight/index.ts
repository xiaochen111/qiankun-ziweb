import { moduleEquipmentRequest, moduleRequest, requestBlob } from '@/utils/requestXhr';

// 此处特殊处理下  分页对象拿的到箱管的分页对象  其他返回的是小飞鱼的对象
/** 返回箱管对象 */
const requestOceanPageListXhr = moduleEquipmentRequest('/ocean-export-quotation');
/** 返回小飞鱼对象 */
const requestOceanXhr = moduleRequest('/ocean-export-quotation');

/**
 * 运价分页查询
 * @param data
 * @returns
 */
export const queryQuotation = (data: any) => {
  return requestOceanPageListXhr<any, true>('/business/quotation/query', {
    method: 'PUT',
    data,
  });
};

/**
 * 运价修改
 * @param data
 * @returns
 */
export const updateQuotation = (data: any) => {
  return requestOceanXhr('/business/quotation/updateObj', {
    method: 'PUT',
    data,
  });
};

/**
 * 通过Excel新增或者更新报价
 * @param data
 * @returns
 */
export const createOrUpdateFromExcel = (data: any[]) => {
  return requestOceanXhr('/business/quotation/createOrUpdateFromExcel', {
    method: 'PUT',
    data,
  });
};

/**
 * 运价新增
 * @param data
 * @returns
 */
export const addQuotation = (data: any) => {
  return requestOceanXhr('/business/quotation/createObj', {
    method: 'POST',
    data,
  });
};
/**
 * 获取航线名称
 * @param data
 * @returns
 */
export const queryLineNameList = (params?: any) => {
  return requestOceanPageListXhr<any, true>('/equipment/helper/getLineNameList', {
    method: 'GET',
    params,
  });
};

/**
 * 运价导出
 * @param data
 * @returns
 */
export const exportQuotation = (data: any) => {
  return requestBlob('/ocean-export-quotation/business/quotation/export', {
    method: 'POST',
    data,
    headers: {
      Accept: 'application/octet-stream',
    },
  });
};

/**
 * ========================== 客户查看 ==========================
 */

/**
 * 客户查询
 * @param data
 * @returns
 */
export const queryQuotationUser = (data: any) => {
  return requestOceanPageListXhr<any, true>('/business/quotation/user/query', {
    method: 'PUT',
    data,
  });
};

/**
 * 更新历史
 * @param data
 * @returns
 */
export const queryQuotationMaintainerHis = (data: any) => {
  return requestOceanPageListXhr<any, true>('/business/quotation/his/maintainer/query', {
    method: 'PUT',
    data,
  });
};

/**
 * 更新历史
 * @param data
 * @returns
 */
export const queryQuotationUserHis = (data: any) => {
  return requestOceanPageListXhr<any, true>('/business/quotation/his/user/query', {
    method: 'PUT',
    data,
  });
};

/**
 * 运价导出
 * @param data
 * @returns
 */
export const exportUserQuotation = (data: any) => {
  return requestBlob('/ocean-export-quotation/business/quotation/user/export', {
    method: 'POST',
    data,
    headers: {
      Accept: 'application/octet-stream',
    },
  });
};
