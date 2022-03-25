import type { DefType, ModalType, ResponseBlob, ResponseResultType } from '@/service/interface';
import { downLoadFile } from '@/utils/common';
import type { ActionType } from '@ant-design/pro-table';
import useRequest from '@umijs/use-request';
import { message } from 'antd';
import { useRef, useState } from 'react';
import { useIntl } from 'umi';

type Iprops = Partial<Record<DefType, (params: any) => Promise<ResponseResultType>>> & {
  exportFile?: (params: any) => Promise<ResponseBlob>;
};

const usePageUtil = (params: Iprops) => {
  const { add, edit, drop, exportFile } = params;
  const tableRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const [type, setType] = useState<ModalType>('add');
  const [currentData, setCurrentData] = useState<any>({});
  const [visible, setVisible] = useState<boolean>(false);
  const [downloadParams, setDownloadParams] = useState<any>({});

  const addRequest = useRequest(add!, {
    manual: true,
    onSuccess: (res) => {
      if (res.success) {
        message.success(formatMessage({ id: 'tips.新增成功' }));
        tableRef.current?.reload();
      }
    },
  });

  const editRequest = useRequest(edit!, {
    manual: true,
    onSuccess: (res) => {
      if (res.success) {
        message.success(formatMessage({ id: 'tips.修改成功' }));
        tableRef.current?.reload();
      }
    },
  });

  const deleteRequest = useRequest(drop!, {
    manual: true,
    onSuccess: (res) => {
      if (res.success) {
        message.success(formatMessage({ id: 'tips.删除成功' }));
        tableRef.current?.reload();
      }
    },
  });

  const exportFileRequest = useRequest(exportFile!, {
    manual: true,
    onSuccess: ({ fileName, blob }) => {
      downLoadFile(fileName, blob);
    },
  });

  const handleModal = (type: ModalType, record: any = {}) => {
    // if (type === 'add') {
    //   setCurrentData({});
    // }
    // if (type === 'edit') {
    //   setCurrentData(record);
    // }
    setCurrentData(record);
    setType(type);
    setVisible(true);
  };

  return {
    type,
    currentData,
    handleModal,
    visible,
    setVisible,
    downloadParams,
    setDownloadParams,
    tableRef,
    addRequest,
    editRequest,
    deleteRequest,
    exportFileRequest,
  };
};

export default usePageUtil;
