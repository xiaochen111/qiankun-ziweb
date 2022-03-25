import type { PagiationType, ResponseResultType } from '@/service/interface';
import { MenuFoldOutlined, MenuUnfoldOutlined, SmallDashOutlined } from '@ant-design/icons';
import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Popover } from 'antd';
import { cloneDeep, isArray, isEmpty, pickBy } from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'umi';

/** 全局添加表格操作栏收缩功能 */
export const handleOprationColomn = (columns?: any[]) => {
  const { formatMessage } = useIntl();
  const [toolstatus, setToolstatus] = useState<boolean>(false);

  return columns?.map((item: any) => {
    if (item.title === formatMessage({ id: 'fields.操作' }) && !item.dataIndex) {
      return {
        ...item,
        title: () => (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <span>{item.title}</span>
            {toolstatus && (
              <MenuFoldOutlined
                onClick={() => {
                  setToolstatus(false);
                }}
              />
            )}
            {!toolstatus && (
              <MenuUnfoldOutlined
                onClick={() => {
                  setToolstatus(true);
                }}
              />
            )}
          </div>
        ),
        width: toolstatus ? 60 : item.width,
        align: 'center',
        render: (_: any, record: any, index: number, action: any) => {
          if (!toolstatus) {
            return <div key={record.id}>{item.render(_, record, index, action)}</div>;
          }
          return (
            <Popover content={item.render(_, record, index, action)} key={record.id} placement="bottomRight">
              <SmallDashOutlined style={{ fontSize: '20px' }} />
            </Popover>
          );
        },
      };
    }
    return item;
  });
};

type Iprops = ProTableProps<any, any> & {
  searchDef: (params: any) => Promise<ResponseResultType<PagiationType>>;
  setDownloadParams?: (params: any) => void;
  /** 条件搜索 需要有值的字段 */
  needColoumsValue?: string[];
};

const StandarTable: React.FC<Iprops> = ({ searchDef, setDownloadParams, needColoumsValue, columns, ...restProps }) => {
  const [collapsed, setCllapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const handleSearchList = async (tableParams: any, sorter: any) => {
    const params = cloneDeep(tableParams);

    /** form 重置时，如果有必传的字段没有值（默认会有分页的值），则手动给数据置空 */
    if (needColoumsValue) {
      const everyHasValue = needColoumsValue.every((item) => params[item]);

      if (!everyHasValue) {
        if (setDownloadParams) {
          setDownloadParams(params);
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
      setDownloadParams(params);
    }

    setLoading(true);
    const { success, data } = await searchDef(
      // 过滤参数空字符
      pickBy(params, (values) => values !== ''),
    );

    setTimeout(() => setLoading(false), 100);

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
        data: data?.records || [],
        total: data?.total,
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
      bordered
      search={{
        // autoFocusFirstInput: false,
        span: 6,
        collapsed,
        onCollapse: setCllapsed,
      }}
      form={{ ignoreRules: false }}
      request={handleSearchList}
      columns={handleOprationColomn(columns)}
      onLoad={(data) => setData(data || [])}
      options={{
        density: false,
      }}
      {...restProps}
      sticky={loading ? false : data.length ? restProps.sticky ?? { offsetHeader: 79, offsetScroll: 0 } : false}
    />
  );
};

export default StandarTable;
