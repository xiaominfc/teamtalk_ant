import { Row, Col, Form, Input, Modal, Radio } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import UploadAvatar from '../../users/components/UploadAvatar';

import { GroupItemInf } from '../data';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAction: (fieldsValue: GroupItemInf) => void;
  handleModalVisible: () => void;
  record:Partial<GroupItemInf>;
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


  const uploadAvatarFinish = (url:string) => {
    form.setFieldsValue({ avatar: url });
  };


  const buildItem = (title:string, id:string, required = true) => (
         <Col span={12}>
         <FormItem wrapperCol={{ span: 20 }}>
         {form.getFieldDecorator(id, {
             rules: [{ required, message: `请输入${title}！`, min: 1 }],
         })(<Input placeholder={title} />)}
         </FormItem>
         </Col>);
  
  

  return (
      <Modal
      destroyOnClose
      title={required?"添加群":"修改群"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      >
      <Row gutter={16}>
      {buildItem('群名', 'name', required)}
      </Row>
      <Row gutter={16}>
      <Col span={12}>
      <FormItem wrapperCol={{ span: 20 }} label="群类型">
      {form.getFieldDecorator('type', { initialValue:record.type, rules: [{ required, message: '选择群类型' }] })(
            <Radio.Group >
              <Radio value="1">普通群</Radio>
              <Radio value="2">临时群</Radio>
            </Radio.Group>,
      )}
      </FormItem>
      </Col>
      <Col span={12}>
      <FormItem wrapperCol={{ span: 20 }} label="群头像">
      {form.getFieldDecorator('avatar', { valuePropName: 'fileList' })(
      <UploadAvatar uploadFinished={uploadAvatarFinish} />,
      )}
      </FormItem>
      </Col>
      </Row>
      </Modal>
  );
};

export default Form.create<CreateFormProps>()(AddOrUpdateForm);
