import EquipMentStandarTable from '@/components/StandardTable/equimentTable';
import usePageUtil from '@/hooks/pageUtils';
import { exportUserQuotation, queryQuotationUser, queryQuotationUserHis } from '@/service/freight';
import { BaseData, PartyRole } from '@/utils/enum';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { BaseDataSelect } from 'dumifile';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { columns as someColumns } from './colums';
import AddOrUpdateModal from './components/AddOrUpdateModal';
import HistroyFreight from './components/HistroyFreight';

const FreightManger: React.FC = () => {
  const { formatMessage } = useIntl();
  const pageUtils = usePageUtil({ exportFile: exportUserQuotation });
  const [hisVisible, setHisVisible] = useState<boolean>(false);
  const [quoId, setQuoId] = useState<any>('');

  const {
    type,
    visible,
    setVisible,
    currentData,
    handleModal,
    tableRef,
    exportFileRequest,
    setDownloadParams,
    downloadParams,
  } = pageUtils;

  const columns: ProColumns<any>[] = [
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
      render: (_, record) => (
        <>
          <span style={{ marginLeft: 20 }}>{record.shipperPartyCode}</span>
          {record.updatedIn24Hours && (
            <img src={require('@/images/new.png')} width="20" style={{ position: 'absolute', left: '0', top: '0' }} />
          )}
        </>
      ),
    },
    ...someColumns,
    {
      title: '操作',
      fixed: 'right',
      search: false,
      width: 120,
      render: (_, record) => (
        <>
          <Button type="link" size="small" onClick={() => handleModal('detail', record)}>
            查看
          </Button>
          <Button
            type="link"
            size="small"
            disabled={!record.isEnabled}
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
            <Button onClick={() => exportFileRequest.run(downloadParams)}>
              {formatMessage({ id: 'button.导出' })}
            </Button>
          </Space>
        }
        columns={columns}
        searchDef={queryQuotationUser}
        actionRef={tableRef}
        setDownloadParams={setDownloadParams}
        params={{
          isEnabled: 1,
        }}
      />
      <AddOrUpdateModal type={type} visible={visible} setVisible={setVisible} currentData={currentData} />
      <HistroyFreight
        visible={hisVisible}
        onClose={() => setHisVisible(false)}
        quoId={quoId}
        searchDef={queryQuotationUserHis}
      />
    </div>
  );
};

export default FreightManger;
