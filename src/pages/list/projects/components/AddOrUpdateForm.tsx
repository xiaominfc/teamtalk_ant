import {  Form, Input, Modal, Radio } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { ProjectItemInf } from '../data';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAction: (fieldsValue: ProjectItemInf) => void;
  handleModalVisible: () => void;
  record:Partial<ProjectItemInf>;
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


  let type = record.type || '1';

  return (
      <Modal
      destroyOnClose
      title={required?"添加项目":"修改项目"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      >
      {buildItem('名称', 'name', required)}
      <FormItem labelCol={{span:6}} label="项目类型:" >
      {form.getFieldDecorator('type', { initialValue: type, rules: [{ required, message: '请选择项目类型: ' }] })(
            <Radio.Group >
              <Radio value="1">组织/机构</Radio>
              <Radio value="2">自由社交</Radio>
            </Radio.Group>,
      )}
      </FormItem>
      </Modal>
  );
};

export default Form.create<CreateFormProps>()(AddOrUpdateForm);
