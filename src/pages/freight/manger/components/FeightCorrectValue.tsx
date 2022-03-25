import { queryLineNameList } from '@/service/freight';
import { BaseData, PartyRole } from '@/utils/enum';
import ProForm, { ProFormCheckbox, ProFormDatePicker, ProFormDigit, ProFormSelect } from '@ant-design/pro-form';
import { Button, Form, Popover, Tooltip } from 'antd';
import { BaseDataSelect } from 'dumifile';
import React from 'react';
import { sailingDate } from './AddOrUpdateModal';

type Iprops = {
  type: 'shipName' | 'seaPort' | 'curName' | 'time' | 'price' | 'timeCheckbox' | 'quelineName';
  changeValue: (p: { value: any; id?: any }) => any;
  message: string;
};

/** 开航日转换 */
export const transformData = (value: any[]): string => {
  value = value || [];
  const selectedBoxLabel: typeof sailingDate = [];

  value.forEach((index) => {
    selectedBoxLabel.push(sailingDate[Number(index) - 1]);
  });

  return selectedBoxLabel.map((item) => item?.label).join(',');
};

const FeightCorrectValue: React.FC<Iprops> = ({ type, changeValue, message }) => {
  const [form] = Form.useForm();

  const formItemElement: Record<Iprops['type'], any> = {
    shipName: (
      <Form.Item name="id" rules={[{ required: true, message: '请选择' }]}>
        <BaseDataSelect
          type={BaseData.partyName}
          params={{
            partyRoleList: [PartyRole.chuangongsi1, PartyRole.chuangongsi2],
          }}
          callback={(value, option) => {
            form.setFieldsValue({ value: option.label });
          }}
          label="rightLabel"
        />
      </Form.Item>
    ),
    seaPort: (
      <Form.Item name="id" rules={[{ required: true, message: '请选择' }]}>
        <BaseDataSelect
          type={BaseData.seaPortEn}
          callback={(value, option) => {
            form.setFieldsValue({ value: option.label });
          }}
        />
      </Form.Item>
    ),
    quelineName: (
      <ProFormSelect
        name="id"
        rules={[{ required: true, message: '请选择' }]}
        request={async () => {
          const res = await queryLineNameList();

          if (res.success) {
            return (
              res.data?.collection.map((item) => ({
                label: item,
                value: item,
              })) || []
            );
          }

          return [];
        }}
      />
    ),
    curName: (
      <Form.Item name="id" rules={[{ required: true, message: '请选择' }]}>
        <BaseDataSelect
          type={BaseData.currency}
          callback={(value, option) => {
            form.setFieldsValue({ value: option.label });
          }}
        />
      </Form.Item>
    ),
    time: <ProFormDatePicker name="value" rules={[{ required: true, message: '请选择' }]} />,
    price: <ProFormDigit name="value" rules={[{ required: true, message: '请输入' }]} />,
    timeCheckbox: (
      <ProFormCheckbox.Group
        name="id"
        options={sailingDate}
        fieldProps={{
          onChange: (value) => {
            const labels = transformData(value);

            form.setFieldsValue({ value: labels });
          },
        }}
      />
    ),
  };

  const onFinish = async (data: any) => {
    console.log('data: ', data);
    if (type === 'timeCheckbox') {
      data.id = data.id.join(',');
    }

    const value = form.getFieldValue('value');

    changeValue({ value, ...data });
  };

  return (
    <Popover
      trigger="click"
      content={
        <ProForm form={form} onFinish={onFinish}>
          {formItemElement[type]}
        </ProForm>
      }
      title="修改"
    >
      <Tooltip title={message}>
        <Button type="link" size="small" danger>
          修改
        </Button>
      </Tooltip>
    </Popover>
  );
};

export default FeightCorrectValue;
