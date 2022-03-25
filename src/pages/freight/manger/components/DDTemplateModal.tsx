/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-01-25 14:33:49
 * @LastEditTime: 2022-03-24 17:45:06
 * @LastEditors: Please set LastEditors
 * @Description:
 */
import { Form, Input, Modal, Switch } from 'antd';
import React, { useState } from 'react';

type Iprops = {
  btn: any;
  handelXhr: (params: any) => Promise<boolean>;
  type: 'updata' | 'fabu' | 'shixiao';
  lineName: string;
};

const confirmText: Record<Iprops['type'], any> = {
  updata: '更新',
  fabu: '发布',
  shixiao: '失效',
};

const DDTemplateModal: React.FC<Iprops> = (props) => {
  const { btn, handelXhr, type, lineName } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const templateStr = `${lineName}航线价格已${confirmText[type]}，详见https://wetrans.cimc.cn/login`;

  const onOk = async () => {
    try {
      const { ddMsgTemplate, is } = await form.validateFields();
      const res = await handelXhr({
        ddMsgTemplate: is ? null : ddMsgTemplate,
      });

      if (res) {
        setVisible(false);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {React.cloneElement(btn, {
        onClick: () => {
          setVisible(true);
        },
      })}
      <Modal visible={visible} onOk={onOk} onCancel={onCancel} okText={confirmText[type]} destroyOnClose>
        <Form form={form} initialValues={{ is: true }}>
          <Form.Item name="is" label="是否启用默认消息推送" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>

          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const isEnable = getFieldValue('is');

              return isEnable ? (
                `钉钉推送内容为:${templateStr}`
              ) : (
                <Form.Item rules={[{ required: true, message: '请输入' }]} name="ddMsgTemplate" label="自定义推送内容">
                  <Input.TextArea />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DDTemplateModal;
