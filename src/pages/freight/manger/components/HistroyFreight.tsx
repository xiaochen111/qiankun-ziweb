/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-24 10:45:53
 * @Description:
 */
import EquipMentStandarTable from '@/components/StandardTable/equimentTable';
import { Modal } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import { columns } from '../colums';

type Iprops = {
  quoId: any;
  visible: boolean;
  onClose: () => void;
  searchDef: (p: any) => Promise<any>;
};

const HistroyFreight: React.FC<Iprops> = ({ quoId, visible, onClose, searchDef }) => {
  const { formatMessage } = useIntl();

  return (
    <Modal
      title={formatMessage({ id: 'title.查看历史' })}
      visible={visible}
      onCancel={onClose}
      onOk={onClose}
      width={1100}
    >
      <EquipMentStandarTable
        columns={columns}
        searchDef={searchDef}
        params={{ quoId }}
        options={false}
        search={false}
      />
    </Modal>
  );
};

export default HistroyFreight;
