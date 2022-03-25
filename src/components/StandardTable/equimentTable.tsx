import type { PagiationEquipmentType, ResponseResultEquipmentType } from '@/service/equimentInterface';
import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { cloneDeep, isArray, isEmpty, pickBy } from 'lodash';
import React, { useState } from 'react';
import { handleOprationColomn } from '.';

type Iprops = ProTableProps<any, any> & {
  searchDef: (params: any) => Promise<ResponseResultEquipmentType<PagiationEquipmentType>>;
  setDownloadParams?: (params: any) => void;
  /** 条件搜索 需要有值的字段 */
  needColoumsValue?: string[];
};

const EquipMentStandarTable: React.FC<Iprops> = ({
  searchDef,
  setDownloadParams,
  needColoumsValue,
  columns,
  ...restProps
}) => {
  const [collapsed, setCllapsed] = useState<boolean>(false);

  /** 记录当前是不是启用本地排序flag */
  const [localSortFlag, setLocalSortFlag] = useState<boolean>(false);

  const handleSearchList = async (params: any, sorter: any) => {
    /** 启用的是本地排序，不让去触发request */
    if (localSortFlag) {
      setLocalSortFlag(false);
      return {
        success: false,
      };
    }

    /** form 重置时，如果有必传的字段没有值（默认会有分页的值），则手动给数据置空 */
    if (needColoumsValue) {
      const everyHasValue = needColoumsValue.every((item) => params[item]);

      if (!everyHasValue) {
        if (setDownloadParams) {
          setDownloadParams({});
        }
        return {
          data: [],
          total: 0,
          success: true,
        };
      }
    }

    if (!isEmpty(sorter || {})) {
      const arr: [string, string][] = Object.entries(sorter);
      const keyvalue = arr[0];

      params.sortBy = keyvalue[0];
      params.isAsc = keyvalue[1] === 'ascend';
    }

    if (setDownloadParams) {
      const cloneData = cloneDeep(params);

      delete cloneData.current;
      delete cloneData.pageSize;
      setDownloadParams(cloneData);
    }

    const { success, data } = await searchDef(
      // 过滤参数空字符
      pickBy(params, (values) => values !== ''),
    );

    console.log('data: ', data);

    if (success) {
      /** 接口不带分页信息时候返回数据 */
      if (isArray(data)) {
        return {
          data,
          total: data.length,
          success,
        };
      }
      return {
        data: data?.collection || [],
        total: data?.totalElements,
        success,
      };
    }
    return {
      data: [],
      total: 0,
      success: false,
    };
  };

  return (
    <ProTable
      rowKey="id"
      size="small"
      scroll={{ x: 'max-content' }}
      columns={handleOprationColomn(columns)}
      bordered
      form={{ ignoreRules: false }}
      request={handleSearchList}
      {...restProps}
      search={{
        span: 6,
        collapsed,
        onCollapse: setCllapsed,
        ...(restProps.search || {}),
      }}
      onChange={(_, filters, sorter: any, extra) => {
        /** 组件外使用并传入的onChange */
        restProps?.onChange?.(_, filters, sorter, extra);

        /**
         *  判断extra.action 为 ’sort‘ 的时候
         *  sorter的值为函数 或者 onFilter为true，启用的是本地排序，不让去触发request, 反之不做处理
         */
        const columnSorter = sorter?.column?.sorter;

        if (typeof columnSorter === 'function' || filters[sorter.field] !== undefined) {
          setLocalSortFlag(true);
        }
      }}
    />
  );
};

export default EquipMentStandarTable;
