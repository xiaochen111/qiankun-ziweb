import EquipMentStandarTable from '@/components/StandardTable/equimentTable';
import usePageUtil from '@/hooks/pageUtils';
import {
  addQuotation,
  exportQuotation,
  queryQuotation,
  queryQuotationMaintainerHis,
  updateQuotation,
} from '@/service/freight';
import { SysRole } from '@/utils/enum';
import type { InitialStateType } from '@/watchGlobalData';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Space, Tag } from 'antd';
import { BaseDataSelect } from 'dumifile';
import { BaseData, PartyRole } from 'dumifile/es/BaseDataSelect/enum';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { columns as someColumns } from './colums';
import AddOrUpdateModal from './components/AddOrUpdateModal';
import DDTemplateModal from './components/DDTemplateModal';
import ExportExecl from './components/ExportExecl';
import HistroyFreight from './components/HistroyFreight';

enum Status {
  /** 未发布 */
  weifabu,
  /** 已发布 */
  yifabu,
  /** 失效 */
  shixiao,
}

const statusColorMap: any = {
  [Status.shixiao]: 'blue',
  [Status.weifabu]: 'gold',
  [Status.yifabu]: 'green',
};

const FreightManger: React.FC<{ globalState: InitialStateType }> = (props) => {
  const { globalState } = props;

  console.log('globalState: ', globalState);

  const { formatMessage } = useIntl();
  const [quoId, setQuoId] = useState<any>('');
  const [hisVisible, setHisVisible] = useState<boolean>(false);
  const { userInfo, roleCodeList } = globalState;

  const pageUtils = usePageUtil({
    edit: updateQuotation,
    add: addQuotation,
    exportFile: exportQuotation,
  });

  const {
    type,
    visible,
    setVisible,
    currentData,
    editRequest,
    addRequest,
    handleModal,
    tableRef,
    exportFileRequest,
    setDownloadParams,
    downloadParams,
  } = pageUtils;

  const stateOption = [
    {
      label: '未发布',
      value: Status.weifabu,
    },
    {
      label: '已发布',
      value: Status.yifabu,
    },
    {
      label: '已失效',
      value: Status.shixiao,
    },
  ];

  const columns: ProColumns<any>[] = [
    {
      title: '状态',
      dataIndex: 'isEnabled',
      valueType: 'select',
      fieldProps: {
        options: stateOption,
      },
      render: (_, record) => (
        <Tag color={statusColorMap[record.isEnabled]} style={{ marginLeft: 20 }}>
          {stateOption[record.isEnabled].label}
        </Tag>
      ),
    },
    {
      title: '船公司',
      dataIndex: 'shipperPartyCode',
      key: 'shipperPartyId',
      renderFormItem: () => (
        <BaseDataSelect
          type={BaseData.partyName}
          params={{
            partyRoleList: [PartyRole.chuangongsi1, PartyRole.chuangongsi2],
          }}
          label="rightLabel"
        />
      ),
    },
    ...someColumns,
    {
      title: '操作',
      fixed: 'right',
      search: false,
      render: (_, record) => (
        <>
          <Button type="link" size="small" disabled={record.isEnabled} onClick={() => handleModal('edit', record)}>
            编辑
          </Button>
          <DDTemplateModal
            lineName={record.lineName}
            btn={
              <Button
                type="link"
                size="small"
                disabled={record.isEnabled === Status.shixiao || record.isEnabled === Status.yifabu}
              >
                发布
              </Button>
            }
            handelXhr={async (params) => {
              const res = await editRequest.run({
                ...record,
                ...params,
                isEnabled: 1,
              });

              return res.success;
            }}
            type="fabu"
          />
          <DDTemplateModal
            lineName={record.lineName}
            btn={
              <Button type="link" size="small" disabled={record.isEnabled === Status.shixiao}>
                失效
              </Button>
            }
            handelXhr={async (params) => {
              const res = await editRequest.run({
                ...record,
                ...params,
                isEnabled: 2,
              });

              return res.success;
            }}
            type="shixiao"
          />
          <Button type="link" size="small" onClick={() => handleModal('copy', { ...record, id: '', isEnabled: 0 })}>
            复制新增
          </Button>
          <Button
            disabled={
              roleCodeList?.includes(SysRole.SYS_ADMIN_ROLE)
                ? false
                : record.isEnabled !== Status.yifabu ||
                  !record.auditFields.createdBy ||
                  record.auditFields.createdBy !== userInfo?.userId
            }
            type="link"
            size="small"
            onClick={() => handleModal('update', record)}
          >
            更新
          </Button>
          <Button
            type="link"
            size="small"
            disabled={record.isEnabled === Status.weifabu}
            onClick={() => {
              setQuoId(record.id);
              setHisVisible(true);
            }}
          >
            更新记录
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <EquipMentStandarTable
        headerTitle={
          <Space>
            <Button onClick={() => handleModal('add')}>{formatMessage({ id: 'button.新增' })}</Button>
            <Button onClick={() => exportFileRequest.run(downloadParams)}>
              {formatMessage({ id: 'button.导出' })}
            </Button>
            <ExportExecl onSuccess={() => tableRef.current?.reload()} />
          </Space>
        }
        columns={columns}
        searchDef={queryQuotation}
        actionRef={tableRef}
        setDownloadParams={setDownloadParams}
      />
      <AddOrUpdateModal
        type={type}
        visible={visible}
        setVisible={setVisible}
        currentData={currentData}
        onOk={{
          add: addRequest,
          edit: editRequest,
          copy: addRequest,
          update: editRequest,
        }}
      />
      <HistroyFreight
        visible={hisVisible}
        onClose={() => setHisVisible(false)}
        quoId={quoId}
        searchDef={queryQuotationMaintainerHis}
      />
    </div>
  );
};

export default FreightManger;
