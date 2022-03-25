import { queryLineNameList } from '@/service/freight';
import type { ModalPropsPro } from '@/service/interface';
import { BaseData, PartyRole } from '@/utils/enum';
import ProForm, {
  ModalForm,
  ProFormCheckbox,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Col, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FormItemLayout, FromSelect } from 'dumifile';
import cloneDeep from 'lodash/cloneDeep';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import DDTemplateModal from './DDTemplateModal';

const title: Partial<Record<ModalPropsPro['type'], any>> = {
  copy: '复制新增',
  add: '新增',
  edit: '编辑',
  detail: '查看',
  update: '更新',
};

export const sailingDate: { value: any; label: any }[] = [
  {
    label: '周一',
    value: '1',
  },
  {
    label: '周二',
    value: '2',
  },
  {
    label: '周三',
    value: '3',
  },
  {
    label: '周四',
    value: '4',
  },
  {
    label: '周五',
    value: '5',
  },
  {
    label: '周六',
    value: '6',
  },
  {
    label: '周日',
    value: '7',
  },
];

const AddOrUpdateModal: React.FC<ModalPropsPro> = (props) => {
  const { setVisible, currentData, visible, onOk, type } = props;

  console.log('currentData: ', currentData);
  const { formatMessage } = useIntl();
  const [form] = useForm();
  const [lineName, setLineName] = useState<string>('');
  const disabled = type === 'detail';

  const onVisibleChange = (b: boolean) => {
    setVisible(b);
    if (b) {
      const cloneData = cloneDeep(currentData);

      cloneData.volidDate = cloneData.effectiveDate &&
        cloneData.expiryDate && [cloneData.effectiveDate, cloneData.expiryDate];
      cloneData.sailingDate = cloneData.sailingDate?.split(',') || [];
      form.setFieldsValue(cloneData);
      setLineName(cloneData.lineName);
      console.log('cloneData: ', cloneData);
    } else {
      form.resetFields();
    }
  };

  const onFinish = async (value: any) => {
    if (type === 'detail') return true;
    try {
      console.log('value: ', value);
      value.effectiveDate = value.volidDate[0];
      value.expiryDate = value.volidDate[1];
      value.sailingDate = value.sailingDate?.join(',');
      delete value.volidDate;
      delete value.baojia;
      const { success } = await onOk![type]!.run({
        ...value,
        id: currentData?.id,
      });

      return success;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <ModalForm
      title={title[type]}
      form={form}
      width={1250}
      visible={visible}
      layout="horizontal"
      onVisibleChange={onVisibleChange}
      onFinish={onFinish}
      initialValues={{
        isSoc: false,
        isDirectRoute: true,
        isEnabled: 0,
        isSCHide: true,
      }}
      submitter={
        type === 'update'
          ? {
              render: () => [
                <Button key="cancal" onClick={() => setVisible(false)}>
                  取消
                </Button>,
                <DDTemplateModal
                  lineName={lineName}
                  key="update"
                  btn={<Button type="primary">更新</Button>}
                  handelXhr={async (params) => {
                    try {
                      const value = await form.validateFields();

                      value.effectiveDate = value.volidDate[0];
                      value.expiryDate = value.volidDate[1];
                      value.sailingDate = value.sailingDate?.join(',');
                      delete value.volidDate;
                      delete value.baojia;
                      const res = await onOk![type]!.run({
                        ...value,
                        ...params,
                        id: currentData?.id,
                      });

                      if (res.success) {
                        setVisible(false);
                        form.resetFields();
                      }

                      return res.success;
                    } catch (error) {
                      console.log('error: ', error);
                      return false;
                    }
                  }}
                  type="updata"
                />,
              ],
            }
          : {}
      }
      modalProps={{
        maskClosable: false,
      }}
    >
      <FormItemLayout disabled={disabled} labelWidth={80}>
        <FromSelect
          formItemProps={{
            name: 'shipperPartyId',
            label: formatMessage({ id: 'fields.船公司' }),
            rules: [{ required: true, message: formatMessage({ id: 'tips.请选择' }) }],
          }}
          selectProps={{
            type: BaseData.partyName,
            params: {
              partyRoleList: [PartyRole.chuangongsi1, PartyRole.chuangongsi2],
            },
            form,
            backNameKey: 'shipperPartyCode',
            label: 'rightLabel',
          }}
        />
        {type === 'detail' && currentData.isSCHide ? null : (
          <>
            <ProFormText name="salesContractNo" label="S/C" />
            {type === 'detail' ? null : (
              <ProFormSwitch label="S/C是否隐藏" name="isSCHide" checkedChildren="是" unCheckedChildren="否" />
            )}
          </>
        )}

        <FromSelect
          formItemProps={{
            name: 'portOfLoadingSeaPortId',
            label: 'POL',
            rules: [{ required: true, message: formatMessage({ id: 'tips.请选择' }) }],
          }}
          selectProps={{
            type: BaseData.seaPortEn,
            form,
            backNameKey: 'portOfLoadingSeaPortName',
          }}
        />
        <FromSelect
          formItemProps={{
            name: 'portOfDischargeSeaPortId',
            label: 'POD',
            rules: [{ required: true, message: formatMessage({ id: 'tips.请选择' }) }],
          }}
          selectProps={{
            type: BaseData.seaPortEn,
            form,
            backNameKey: 'portOfDischargeSeaPortName',
          }}
        />
        <ProFormSwitch
          label="SOC"
          name="isSoc"
          rules={[{ required: true, message: formatMessage({ id: 'tips.请选择' }) }]}
          checkedChildren="是"
          unCheckedChildren="否"
        />
        <ProFormDateRangePicker
          name="volidDate"
          label="有效期"
          rules={[{ required: true, message: formatMessage({ id: 'tips.请选择' }) }]}
        />
        <ProFormSwitch name="isDirectRoute" label="中转方式" checkedChildren="直航" unCheckedChildren="中转" />
        <FromSelect
          formItemProps={{
            name: 'transportationSeaPortId',
            label: '中转港',
          }}
          selectProps={{
            type: BaseData.seaPortEn,
            form,
            backNameKey: 'transportationSeaPortName',
          }}
        />
        {/* <ProFormDigit name="gp20" label="20GP" />
        <ProFormDigit name="gp40" label="40GP" />
        <ProFormDigit name="hc40" label="40HC" />
        <ProFormDigit name="hc45" label="45HC" />
        <ProFormDigit name="nor20" label="2ONOR" />
        <ProFormDigit name="nor40" label="4ONOR" /> */}
        <FromSelect
          formItemProps={{
            name: 'curId',
            label: formatMessage({ id: 'fields.币种' }),
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'tips.请选择' }),
              },
            ],
          }}
          selectProps={{
            type: BaseData.currency,
            isInit: true,
            form,
            backNameKey: 'curName',
          }}
        />
        <ProFormText name="lineCode" label="船司航线代码" />
        <ProFormDigit name="voyage" label="航程" addonAfter="天" />
        <ProFormText name="harbourDistinct" label="港区" />
        <ProFormSelect
          name="lineName"
          label="航线名"
          rules={[{ required: true, message: formatMessage({ id: 'tips.请选择' }) }]}
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
          fieldProps={{
            onChange: (value, option: any) => {
              setLineName(option?.label);
            },
          }}
        />
        <FormItemLayout.LayoutChild size={4}>
          <ProFormCheckbox.Group name="sailingDate" label="开航日" options={sailingDate} />
        </FormItemLayout.LayoutChild>
        <FormItemLayout.LayoutChild size={4}>
          <ProForm.Item
            label="报价"
            name="baojia"
            required={true}
            rules={[
              {
                validator: async () => {
                  const { gp20, gp40, hc40, hc45, nor20, nor40 } = form.getFieldsValue();

                  if (gp20 || gp40 || hc40 || hc45 || nor20 || nor40) return Promise.resolve();

                  return Promise.reject();
                },
                message: '报价请任选一直填写',
              },
            ]}
          >
            <Row gutter={10}>
              <Col span={4}>
                <ProFormDigit name="gp20" label="20GP" disabled={disabled} />
              </Col>
              <Col span={4}>
                <ProFormDigit name="gp40" label="40GP" disabled={disabled} />
              </Col>
              <Col span={4}>
                <ProFormDigit name="hc40" label="40HC" disabled={disabled} />
              </Col>
              <Col span={4}>
                <ProFormDigit name="hc45" label="45HC" disabled={disabled} />
              </Col>
              <Col span={4}>
                <ProFormDigit name="nor20" label="2ONOR" disabled={disabled} />
              </Col>
              <Col span={4}>
                <ProFormDigit name="nor40" label="4ONOR" disabled={disabled} />
              </Col>
            </Row>
          </ProForm.Item>
        </FormItemLayout.LayoutChild>
        <FormItemLayout.LayoutChild size={2}>
          <ProFormTextArea name="remark" label="备注" />
        </FormItemLayout.LayoutChild>
        <FormItemLayout.LayoutChild size={2}>
          <ProFormTextArea name="additionalCharge" label="附加费" />
        </FormItemLayout.LayoutChild>
        {/* 隐藏值 初始化时如果用户不点到资费tab 将后端生成的资费数据放在这里 */}
        <ProForm.Item name="isEnabled" hidden>
          {null}
        </ProForm.Item>
      </FormItemLayout>
    </ModalForm>
  );
};

export default AddOrUpdateModal;
