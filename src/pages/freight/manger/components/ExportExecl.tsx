import { createOrUpdateFromExcel, queryLineNameList } from '@/service/freight';
import { BaseData, PartyRole, TimeFormateType } from '@/utils/enum';
import { ModalForm } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import useRequest from '@umijs/use-request';
import { Button, Empty, message, Popconfirm, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import type { SelectOptionType } from 'dumifile/es/BaseDataSelect';
import { getSelectData } from 'dumifile/es/BaseDataSelect/getData';
import { cloneDeep, pullAt, trim } from 'lodash';
import type { RuleObject } from 'rc-field-form/lib/interface';
import React, { useEffect, useRef, useState } from 'react';
import { sailingDate } from './AddOrUpdateModal';
import DDTemplateModal from './DDTemplateModal';
import FeightCorrectValue from './FeightCorrectValue';

const { Text } = Typography;

const sailingDateMap: any = {};

sailingDate.forEach((item) => {
  sailingDateMap[item.label] = item.value;
});

/** 报价 */
const priceKeysList = ['gp20', 'gp40', 'hc40', 'hc45', 'nor20', 'nor40'];
const style: React.CSSProperties = {
  background: '#f2d7b2',
  fontWeight: 'bold',
};
/** 处理粘贴的excel数据 */
const handleOnpasteData = (e: any): any[][] => {
  const html: string = e.clipboardData.getData('text/html');
  const doc: Document = new DOMParser().parseFromString(html, 'text/html');
  const allTrList = Array.from(doc.querySelectorAll('table tr'));
  const rowData: any[][] = [];

  allTrList.forEach((item: any) => {
    const trList: any[] = [];

    item.cells.forEach((tr: any) => {
      trList.push(tr.innerText);
    });
    rowData.push(trList);
  });
  return rowData;
};

const ExportExecl: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [tableDate, setTableDate] = useState<any[]>([]);
  const [visible, setvisible] = useState<boolean>(false);
  /** 船公司partylist */
  const [shipperPartyList, setShipperPartyList] = useState<SelectOptionType[]>([]);
  /** 港口portlist */
  const [portList, setPortList] = useState<SelectOptionType[]>([]);
  /** 币种curlist */
  const [curlist, setCurlist] = useState<any[]>([]);
  /** 航线list */
  const [quelineNames, setQuelineNames] = useState<SelectOptionType[]>([]);
  const isAllRight = useRef<boolean>(true);

  const getPartysXhr = useRequest(getSelectData, {
    defaultParams: [BaseData.partyName, { partyRoleList: [PartyRole.chuangongsi1, PartyRole.chuangongsi2] }],
    onSuccess: (res) => setShipperPartyList(res),
  });

  const getSeaPortXhr = useRequest(getSelectData, {
    defaultParams: [BaseData.seaPortEn, { pageSize: 4000 }],
    onSuccess: (res) => setPortList(res),
  });

  const getCurrencyXhr = useRequest(getSelectData, {
    defaultParams: [BaseData.currency, {}],
    onSuccess: (res) => setCurlist(res),
  });

  const getQueLineNameXhr = useRequest(queryLineNameList, {
    onSuccess: (res) => {
      if (res.success) {
        const quelineList = res.data.collection.map((item) => ({ value: item, label: item })) || [];

        setQuelineNames(quelineList as any);
      }
    },
  });
  /** 修改当前值 */
  const setCurrentRowItemData = (
    data: { value: any; id?: any },
    index: number,
    dataIndex: string,
    dataIndexId?: any,
  ) => {
    const cloneTableDate = cloneDeep(tableDate);
    const currentRow = cloneTableDate[index];

    currentRow[dataIndex] = data.value;
    if (dataIndexId) currentRow[dataIndexId] = data.id;

    /** 报价只要值改变就去除修改 */
    if (priceKeysList.includes(dataIndex)) {
      priceKeysList.forEach((key) => {
        delete currentRow[`${key}Error`];
      });
    }

    delete currentRow[`${dataIndex}Error`];
    setTableDate(cloneTableDate);
    console.log('cloneTableDate: ', cloneTableDate);
  };

  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      render: (_, reocod, index) => index + 1,
    },
    {
      title: 'S/C',
      dataIndex: 'salesContractNo',
    },
    {
      title: 'S/C是否隐藏【是/否，不填默认是】',
      dataIndex: 'isSCHideName',
      formItemProps: {
        rules: [
          {
            transform: () => 'isSCHide',
          },
        ],
      },
    },
    {
      title: '船公司',
      dataIndex: 'shipperPartyName',
      onHeaderCell: () => ({ style }),
      key: 'shipperPartyId',
      valueType: 'select',
      render: (_, record, index) =>
        record.shipperPartyNameError ? (
          <FeightCorrectValue
            type="shipName"
            message="船公司匹配不上"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'shipperPartyName', 'shipperPartyId')}
          />
        ) : (
          record.shipperPartyName
        ),
      formItemProps: {
        rules: [
          {
            validator: ((rule: any, value: any) => {
              const filterItem = shipperPartyList.filter((item) => item.rightLabel === value);

              if (filterItem.length) return filterItem[0];
              return false;
            }) as any,
          },
        ],
      },
    },
    {
      title: 'POL',
      dataIndex: 'portOfLoadingSeaPortName',
      onHeaderCell: () => ({ style }),
      key: 'portOfLoadingSeaPortId',
      valueType: 'select',
      render: (_, record, index) =>
        record.portOfLoadingSeaPortNameError ? (
          <FeightCorrectValue
            type="seaPort"
            message="POL匹配不上"
            changeValue={async (value) =>
              setCurrentRowItemData(value, index, 'portOfLoadingSeaPortName', 'portOfLoadingSeaPortId')
            }
          />
        ) : (
          record.portOfLoadingSeaPortName
        ),
      formItemProps: {
        rules: [
          {
            validator: ((rule: any, value: any) => {
              const filterItem = portList.filter(
                (item) => item.label.replace(/\s+/g, '') === value.replace(/\s+/g, ''),
              );

              if (filterItem.length) return filterItem[0];
              return false;
            }) as any,
          },
        ],
      },
    },
    {
      title: 'POD',
      dataIndex: 'portOfDischargeSeaPortName',
      onHeaderCell: () => ({ style }),
      key: 'portOfDischargeSeaPortId',
      valueType: 'select',
      render: (_, record, index) =>
        record.portOfDischargeSeaPortNameError ? (
          <FeightCorrectValue
            message="POD匹配不上"
            type="seaPort"
            changeValue={async (value) =>
              setCurrentRowItemData(value, index, 'portOfDischargeSeaPortName', 'portOfDischargeSeaPortId')
            }
          />
        ) : (
          record.portOfDischargeSeaPortName
        ),
      formItemProps: {
        rules: [
          {
            validator: ((rule: any, value: any) => {
              const filterItem = portList.filter(
                (item) => item.label.replace(/\s+/g, '') === value.replace(/\s+/g, ''),
              );

              if (filterItem.length) return filterItem[0];
              return false;
            }) as any,
          },
        ],
      },
    },
    {
      title: '港区',
      dataIndex: 'harbourDistinct',
    },
    {
      title: '生效日期',
      dataIndex: 'effectiveDate',
      onHeaderCell: () => ({ style }),
      render: (_, record, index) =>
        record.effectiveDateError ? (
          <FeightCorrectValue
            message="格式错误"
            type="time"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'effectiveDate')}
          />
        ) : (
          record.effectiveDate
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'effectiveDate',
          },
          {
            pattern: /\d{4}\-\d{2}\-\d{2}/,
          },
        ],
      },
    },
    {
      title: '失效日期',
      onHeaderCell: () => ({ style }),
      dataIndex: 'expiryDate',
      render: (_, record, index) =>
        record.expiryDateError ? (
          <FeightCorrectValue
            message="格式错误"
            type="time"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'expiryDate')}
          />
        ) : (
          record.expiryDate
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'expiryDate',
          },
          {
            pattern: /\d{4}\-\d{2}\-\d{2}/,
          },
        ],
      },
    },
    {
      title: '中转方式【直航/中转】',
      dataIndex: 'isDirectRouteBoolean',
      // valueType: 'select',
      // fieldProps: {
      //   options: [
      //     {
      //       label: '直航',
      //       value: true,
      //     },
      //     {
      //       label: '中转',
      //       value: false,
      //     },
      //   ],
      // },
      formItemProps: {
        rules: [
          {
            transform: () => 'isDirectRoute',
          },
        ],
      },
    },
    {
      title: '航线名',
      dataIndex: 'lineName',
      onHeaderCell: () => ({ style }),
      render: (_, record, index) =>
        record.lineNameError ? (
          <FeightCorrectValue
            message="航线名匹配不上"
            type="quelineName"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'lineName', 'lineName')}
          />
        ) : (
          record.lineName
        ),
      formItemProps: {
        rules: [
          {
            validator: ((rule: any, value: any) => {
              const filterItem = quelineNames.filter(
                (item) => String(item.label).toLocaleUpperCase() === String(value).toLocaleUpperCase(),
              );

              if (filterItem.length) return filterItem[0];
              return false;
            }) as any,
          },
        ],
      },
    },
    {
      title: '中转港',
      dataIndex: 'transportationSeaPortName',
      key: 'transportationSeaPortId',
      valueType: 'select',
      render: (_, record, index) =>
        record.transportationSeaPortNameError ? (
          <FeightCorrectValue
            message="中转港匹配不上"
            type="seaPort"
            changeValue={async (value) =>
              setCurrentRowItemData(value, index, 'transportationSeaPortName', 'transportationSeaPortId')
            }
          />
        ) : (
          record.transportationSeaPortName
        ),
      formItemProps: {
        rules: [
          {
            validator: ((rule: any, value: any) => {
              // 此项不是必填项
              if (!value) return {};

              const filterItem = portList.filter(
                (item) => item.label.replace(/\s+/g, '') === value.replace(/\s+/g, ''),
              );

              if (filterItem.length) return filterItem[0];
              return false;
            }) as any,
          },
        ],
      },
    },
    {
      title: '币种',
      dataIndex: 'curName',
      onHeaderCell: () => ({ style }),
      key: 'curId',
      valueType: 'select',
      render: (_, record, index) =>
        record.curNameError ? (
          <FeightCorrectValue
            message="币种匹配不上"
            type="curName"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'curName', 'curId')}
          />
        ) : (
          record.curName
        ),
      formItemProps: {
        rules: [
          {
            validator: ((rule: any, value: any) => {
              const filterItem = curlist.filter(
                (item) => String(item.label).toLocaleUpperCase() === String(value).toLocaleUpperCase(),
              );

              if (filterItem.length) return filterItem[0];
              return false;
            }) as any,
          },
        ],
      },
    },
    {
      title: '20GP',
      dataIndex: 'gp20',
      render: (_, record, index) =>
        record.gp20Error ? (
          <FeightCorrectValue
            message="报价六选一"
            type="price"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'gp20')}
          />
        ) : (
          record.gp20
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'gp20',
          },
        ],
      },
    },
    {
      title: '40GP',
      dataIndex: 'gp40',
      render: (_, record, index) =>
        record.gp40Error ? (
          <FeightCorrectValue
            message="报价六选一"
            type="price"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'gp40')}
          />
        ) : (
          record.gp40
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'gp40',
          },
        ],
      },
    },
    {
      title: '40HC',
      dataIndex: 'hc40',
      render: (_, record, index) =>
        record.hc40Error ? (
          <FeightCorrectValue
            message="报价六选一"
            type="price"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'hc40')}
          />
        ) : (
          record.hc40
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'hc40',
          },
        ],
      },
    },
    {
      title: '45HC',
      dataIndex: 'hc45',
      render: (_, record, index) =>
        record.hc45Error ? (
          <FeightCorrectValue
            message="报价六选一"
            type="price"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'hc45')}
          />
        ) : (
          record.hc45
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'hc45',
          },
        ],
      },
    },
    {
      title: '20NOR',
      dataIndex: 'nor20',
      render: (_, record, index) =>
        record.nor20Error ? (
          <FeightCorrectValue
            message="报价六选一"
            type="price"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'nor20')}
          />
        ) : (
          record.nor20
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'nor20',
          },
        ],
      },
    },
    {
      title: '40NOR',
      dataIndex: 'nor40',
      render: (_, record, index) =>
        record.nor40Error ? (
          <FeightCorrectValue
            message="报价六选一"
            type="price"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'nor40')}
          />
        ) : (
          record.nor40
        ),
      formItemProps: {
        rules: [
          {
            transform: () => 'nor40',
          },
        ],
      },
    },
    {
      title: 'SOC【是/否】',
      dataIndex: 'isSoc',
      formItemProps: {
        rules: [
          {
            transform: () => 'isSoc',
          },
        ],
      },
    },
    {
      title: '附加费',
      dataIndex: 'additionalCharge',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '船司航线代码',
      dataIndex: 'lineCode',
    },
    {
      title: '航程',
      dataIndex: 'voyage',
      formItemProps: {
        rules: [
          {
            transform: () => 'voyage',
          },
        ],
      },
    },
    {
      title: '开航日',
      dataIndex: 'sailingDateStr',
      render: (_, record, index) =>
        record.sailingDateStrError ? (
          <FeightCorrectValue
            message="格式不正确"
            type="timeCheckbox"
            changeValue={async (value) => setCurrentRowItemData(value, index, 'sailingDateStr', 'sailingDate')}
          />
        ) : (
          record.sailingDateStr
        ),
      formItemProps: {
        rules: [
          {
            validator: ((rule: any, value: any) => {
              // 此项不是必填项
              if (!value) return {};

              const flag = /^(周[一二三四五六日]([,，])?)+$/g.test(value);

              if (flag) return {};
              return false;
            }) as any,
          },
          {
            transform: () => 'sailingDate',
          },
        ],
      },
    },
    {
      title: '校验结果',
      fixed: 'right',
      dataIndex: 'result',
      width: 120,
      render: (_, record) => {
        if (record.result) {
          return <Text type="danger">{record.result}</Text>;
        }

        const hasError = Object.keys(record).some((item) => item.indexOf('Error') !== -1);

        if (hasError) return <Text type="danger">当前行数据有误</Text>;
        return <Text type="success">校验通过</Text>;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record, index) => (
        <Popconfirm
          title="确定删除？"
          onConfirm={() => {
            const cloneData = cloneDeep(tableDate);

            pullAt(cloneData, [index]);
            setTableDate(cloneData);
          }}
          onCancel={() => {}}
        >
          <Button type="link" size="small">
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleOnpaste = (e: any) => {
    const rowData = handleOnpasteData(e);
    /** 表头数据 */
    const headerStr = rowData?.[0]?.join(',');
    const coloumsTitle = columns
      .slice(1, -2)
      .map((item) => item.title)
      .join(',');

    if (headerStr !== coloumsTitle) {
      message.warn('表头数据粘贴数据有误，请重新复制再试');
      return;
    }
    /** 所有数据  */
    const rowCellData: any[] = [];

    rowData.forEach((currentRowCell, index) => {
      const iteratorListValue = currentRowCell[Symbol.iterator]();
      const iteratorListKey = columns
        .slice(1, -2)
        .map((item) => item.dataIndex)
        [Symbol.iterator]();

      if (index) {
        let currentRowMap = { rowkey: `${Math.random()}` };

        while (true) {
          const valueIterator = iteratorListValue.next();
          const keyIterator = iteratorListKey.next();

          if (valueIterator.done) {
            rowCellData.push(currentRowMap);
            break;
          }
          currentRowMap = {
            ...currentRowMap,
            [keyIterator.value]: trim(valueIterator.value || ''),
          };
        }
      }
    });

    // setTableDate(rowCellData);
    validateFields(rowCellData);
  };

  /** 数据转换 */
  const transformData = (itemRule: RuleObject, currentDataObj: { currentValue: any }, rowData: any) => {
    const key = itemRule.transform?.(currentDataObj.currentValue);
    const timeKeys = ['effectiveDate', 'expiryDate'];

    if (key === 'isDirectRoute') {
      const map: any = {
        中转: false,
        直航: true,
      };

      rowData[key] = map[currentDataObj.currentValue] || false;
      if (map[currentDataObj.currentValue] === undefined) {
        rowData.isDirectRouteBoolean = '';
      }
    }

    if (key === 'isSoc') {
      if (currentDataObj.currentValue === '是') {
        rowData[key] = true;
      } else {
        rowData[key] = false;
      }
    }

    if (key === 'isSCHide') {
      if (currentDataObj.currentValue === '是' || !currentDataObj.currentValue) {
        rowData[key] = true;
      } else {
        rowData[key] = false;
      }
    }
    /** 时间转换 */
    if (timeKeys.includes(key)) {
      const flag = /^\d{4}([\-\/])\d{1,2}([\-\/])\d{1,2}$/.test(currentDataObj.currentValue);

      if (flag) {
        rowData[key] = dayjs(currentDataObj.currentValue).format(TimeFormateType.YMD);
        currentDataObj.currentValue = dayjs(currentDataObj.currentValue).format(TimeFormateType.YMD);
      }
    }
    /** 开航日转换 */
    if (key === 'sailingDate') {
      const sailingDateKeyList = String(currentDataObj.currentValue).split(/[,，]/);
      const valueList: any[] = [];

      sailingDateKeyList.forEach((item) => {
        valueList.push(sailingDateMap[item]);
      });
      rowData[key] = valueList.join(',');
    }
    /** 数字校验 */
    const numberList = [...priceKeysList, 'voyage'];

    if (numberList.includes(key)) {
      if (!/^\d+$/.test(currentDataObj.currentValue)) {
        rowData[key] = null;
        currentDataObj.currentValue = null;
      } else {
        rowData[key] *= 1;
      }
    }
  };

  /** 数据校验 && select类型字段赋值  */
  const validateFields = (data: any[]) => {
    isAllRight.current = true;
    data.forEach((rowData) => {
      Object.keys(rowData).forEach((keys) => {
        /** 报价六选一特殊处理 */
        const priceValueList: any[] = [];

        priceKeysList.forEach((key) => {
          if (rowData[key]) {
            priceValueList.push(rowData[key]);
          }
        });
        if (priceValueList.length === 0) {
          isAllRight.current = false;
          priceKeysList.forEach((keys) => {
            rowData[`${keys}Error`] = true;
          });
        }

        columns.forEach((item) => {
          if (item.dataIndex === keys && (item.formItemProps as any)?.rules) {
            const rules: RuleObject[] = (item.formItemProps as any)?.rules;
            const currentDataObj = { currentValue: rowData[keys] };

            let flag: any = true;

            for (let index = 0; index < rules.length; index++) {
              const itemRule = rules[index];

              if (itemRule.pattern) {
                flag = String(currentDataObj.currentValue).search(itemRule.pattern) !== -1;
                // flag = itemRule.pattern.test(currentDataObj.currentValue);
                if (!flag) {
                  isAllRight.current = false;
                  rowData[`${keys}Error`] = true;
                  break;
                }
              }
              if (itemRule.validator) {
                flag = itemRule.validator(itemRule, currentDataObj.currentValue, () => {}) as any;
                if (!flag) {
                  isAllRight.current = false;
                  rowData[`${keys}Error`] = true;
                  break;
                }
                if (item.valueType === 'select') {
                  const id = keys.replace('Name', 'Id');

                  rowData[id] = flag.value;
                }
              }
              /** 不是校验项 但值需要转换 */
              if (itemRule.transform) {
                transformData(itemRule, currentDataObj, rowData);
              }
            }
          }
        });
      });
    });
    console.log('data:', data);
    const cloneData = cloneDeep(data);

    setTableDate(cloneData);
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('paste', handleOnpaste);
    } else {
      isAllRight.current = true;
      setTableDate([]);
    }
    return () => {
      document.removeEventListener('paste', handleOnpaste);
    };
  }, [visible]);

  const onFinish = async (ddTemplate: any) => {
    if (tableDate.length === 0) {
      message.warn('请粘贴数据后提交');
      return false;
    }
    validateFields(tableDate);
    if (isAllRight.current) {
      const res = await createOrUpdateFromExcel(tableDate.map((item) => ({ ...item, ...ddTemplate })));

      if (res.success) {
        onSuccess();
      } else {
        const flag = new RegExp(/no:(\d+)\r\nmsg:(.*)/).exec(res.msg!);

        if (flag) {
          const num = Number(RegExp.$1);
          const msg = RegExp.$2;

          tableDate[num - 1].result = msg;

          const cloneData = cloneDeep(tableDate);

          setTableDate(cloneData);
        }
      }
      return res.success;
    }
    message.warn('当前页面导入数据有误，请进行查看页面进行调整后再提交');
    return false;
  };

  return (
    <ModalForm
      trigger={
        <Button
          type="primary"
          loading={getPartysXhr.loading || getCurrencyXhr.loading || getSeaPortXhr.loading || getQueLineNameXhr.loading}
        >
          批量导入
        </Button>
      }
      title="批量导入"
      width={1300}
      visible={visible}
      onVisibleChange={setvisible}
      // onFinish={onFinish}
      submitter={{
        searchConfig: {
          submitText: '生成运价',
        },
        render: () => [
          <Button key="cancal" onClick={() => setvisible(false)}>
            取消
          </Button>,
          <DDTemplateModal
            key="update"
            lineName={tableDate[0]?.lineName}
            btn={<Button type="primary">生产运价</Button>}
            handelXhr={async (params) => {
              try {
                const res = await onFinish(params);

                if (res) {
                  setvisible(false);
                }

                return res;
              } catch (error) {
                console.log('error: ', error);
                return false;
              }
            }}
            type="fabu"
          />,
        ],
      }}
      modalProps={{
        maskClosable: false,
      }}
    >
      <ProTable
        columns={columns}
        rowKey="rowkey"
        bordered={true}
        search={false}
        dataSource={tableDate}
        size="small"
        scroll={{ x: 'max-content' }}
        options={false}
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ctrl + V 粘贴 Excel 数据" />,
        }}
        columnEmptyText={false}
        headerTitle={
          <Space>
            <Button danger onClick={() => setTableDate([])}>
              清空数据
            </Button>
            <Button type="primary" href="/ExportFerightPriceDemo.xlsx" download>
              模版下载
            </Button>
          </Space>
        }
        toolBarRender={() => [<span style={{ color: 'red' }}>*注：运价报价六选一必填</span>]}
      />
    </ModalForm>
  );
};

export default ExportExecl;
