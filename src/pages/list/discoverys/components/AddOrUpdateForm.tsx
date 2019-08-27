import {  Form, Input, Modal, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { DiscoveryItemInf } from '../data';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAction: (fieldsValue: DiscoveryItemInf) => void;
  handleModalVisible: () => void;
  record:Partial<DiscoveryItemInf>;
}


const AddOrUpdateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAction, handleModalVisible, record } = props;
  let required = true;
  if (record.id) {
    required = false;
  }

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!required) {
        fieldsValue.id = record.id;
      }
      form.resetFields();
      Object.keys(fieldsValue).map(key => {
        if (fieldsValue[key] == null) {
          fieldsValue[key] = record[key];
        }
      });
      handleAction(fieldsValue);
    });
  };

  const buildItem = (title:string, id:string, required = true) => (
         <FormItem>
         {form.getFieldDecorator(id, {
             rules: [{ required, message: `请输入${title}！`, min: 1 }],
         })(<Input placeholder={title} />)}
         </FormItem>
  );


let priority = record.itemPriority || '0';

  return (
      <Modal
      destroyOnClose
      title={required?"添加发现":"修改发现"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      >
      {buildItem('标题', 'itemName', required)}
      {buildItem('URL', 'itemUrl', required)}
      <FormItem wrapperCol={{ span: 20 }} labelCol={{span:4}} label="优先级" >
      {form.getFieldDecorator('itemPriority', { initialValue: priority,
      })(<InputNumber min={0} max={10000} />)}
      </FormItem>
      </Modal>
  );
};

export default Form.create<CreateFormProps>()(AddOrUpdateForm);
