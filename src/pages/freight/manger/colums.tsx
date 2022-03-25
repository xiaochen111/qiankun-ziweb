import { BaseData } from '@/utils/enum';
import type { ProColumns } from '@ant-design/pro-table';
import { BaseDataSelect } from 'dumifile';
import { transformData } from './components/FeightCorrectValue';

export const columns: ProColumns<any>[] = [
  {
    title: 'S/C',
    dataIndex: 'salesContractNo',
  },
  {
    title: 'POL',
    dataIndex: 'portOfLoadingSeaPortName',
    key: 'portOfLoadingSeaPortId',
    renderFormItem: () => <BaseDataSelect type={BaseData.seaPortEn} />,
  },
  {
    title: 'POD',
    dataIndex: 'portOfDischargeSeaPortName',
    // onCell: (item, index) => {
    //   console.log('item: ', item);
    //   return { className: 'asaa' };
    // },
    key: 'portOfDischargeSeaPortId',
    renderFormItem: () => <BaseDataSelect type={BaseData.seaPortEn} />,
  },
  {
    title: '港区',
    dataIndex: 'harbourDistinct',
  },
  {
    title: '生效日期',
    dataIndex: 'effectiveDate',
    valueType: 'date',
  },
  {
    title: '失效日期',
    dataIndex: 'expiryDate',
    valueType: 'date',
  },
  {
    title: '中转方式',
    dataIndex: 'isDirectRoute',
    valueType: 'select',
    fieldProps: {
      options: [
        {
          label: '直航',
          value: true,
        },
        {
          label: '中转',
          value: false,
        },
      ],
    },
  },
  {
    title: '中转港',
    dataIndex: 'transportationSeaPortName',
    key: 'transportationSeaPortId',
    renderFormItem: () => <BaseDataSelect type={BaseData.seaPortEn} />,
  },
  {
    title: '航线名',
    dataIndex: 'lineName',
    search: false,
  },
  {
    title: '币种',
    dataIndex: 'curName',
    search: false,
  },
  {
    title: '20GP',
    dataIndex: 'gp20',
    search: false,
  },
  {
    title: '40GP',
    dataIndex: 'gp40',
    search: false,
  },
  {
    title: '40HC',
    dataIndex: 'hc40',
    search: false,
  },
  {
    title: '45HC',
    dataIndex: 'hc45',
    search: false,
  },
  {
    title: '20NOR',
    dataIndex: 'nor20',
    search: false,
  },
  {
    title: '40NOR',
    dataIndex: 'nor40',
    search: false,
  },
  {
    title: 'SOC',
    dataIndex: 'isSoc',
    search: false,
  },
  {
    title: '附加费',
    dataIndex: 'isEnabled',
    search: false,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    search: false,
  },
  {
    title: '船公司航线代码',
    dataIndex: 'lineCode',
    search: false,
  },
  {
    title: '开航日',
    dataIndex: 'sailingDate',
    search: false,
    render: (_, record) => transformData(record.sailingDate?.split(',')),
  },
  {
    title: '创建人',
    dataIndex: 'createdByName',
    search: false,
  },
  {
    title: '更新时间',
    dataIndex: ['auditFields', 'updateDate'],
    search: false,
  },
];
