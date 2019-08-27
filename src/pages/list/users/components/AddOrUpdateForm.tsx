import { Row, Col, Form, Input, Modal, Select, Radio } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import UploadAvatar from './UploadAvatar';
import { DepartItemInf, UserItemInf } from '../data';
const { Option } = Select;
const FormItem = Form.Item;





interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAction: (fieldsValue:UserItemInf) => void;
  handleModalVisible: () => void;
  departMap:{[id:string]:Partial<DepartItemInf>};
  record:Partial<UserItemInf>;
}

const AddOrUpdateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAction, handleModalVisible, departMap, record } = props;

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
      Object.keys(fieldsValue).map(key => {
        if (fieldsValue[key] == null) {
          if (key == 'password' && !required) {
            return;
          }
          fieldsValue[key] = record[key];
        }
      });
      handleAction(fieldsValue);
      form.resetFields();
    });
  };


  const uploadAvatarFinish = (url:string) => {
    form.setFieldsValue({ avatar: url });
  };

 const departSelector = () => {
     const options:JSX.Element[] = [];
     if (departMap != null) {
        Object.values(departMap).map((depart:Partial<DepartItemInf>) => {
          let element = <Option value={depart.id} key={depart.id} >{depart.departName}</Option>; 
          options.push(element);
        });
     }

    return (<Select
          placeholder="部门"
          style={{ width: '100%' }}
        >
        {options}
        </Select>);
  };


  const buildItem = (title:string, id:string, required = true) => (
         <Col span={12}>
         <FormItem wrapperCol={{ span: 20 }}>
         {form.getFieldDecorator(id, {
             rules: [{ required, message: `请输入${title}！`, min: 1 }],
         })(<Input placeholder={title} />)}
         </FormItem>
         </Col>);


  let defaultSex = '1';
  let defaultDepart = null;

  if (!required) {
    if (record.sex == '女') {
      defaultSex = '0';
    }
    defaultDepart = record.departId;
  }

  return (
      <Modal
      destroyOnClose
      title={required?"添加用户":"编辑用户"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      >
      <Row gutter={16}>
      {buildItem('用户名', 'name', required)}
      {buildItem('昵称', 'nick', required)}
      </Row>
      <Row gutter={16}>
      {buildItem('密码', 'password', required)}
      <Col span={12}>
      <FormItem wrapperCol={{ span: 20 }}>
      {form.getFieldDecorator('departId', { initialValue: defaultDepart,
          rules: [{ required, message: '请选择部门！', min: 1 }],
      })(departSelector())}
      </FormItem>
      </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
      <FormItem wrapperCol={{ span: 20 }} label="性别">
      {form.getFieldDecorator('sex', { initialValue: defaultSex, rules: [{ required, message: '请选择性别' }] })(
            <Radio.Group >
              <Radio value="1">男</Radio>
              <Radio value="0">女</Radio>
            </Radio.Group>,
      )}
      </FormItem>
      </Col>
      <Col span={12}>
      <FormItem wrapperCol={{ span: 20 }} label="头像">
      {form.getFieldDecorator('avatar', { valuePropName: 'fileList' })(
      <UploadAvatar uploadFinished={uploadAvatarFinish} />,
      )}
      </FormItem>
      </Col>
      </Row>
      <Row gutter={16}>
      {buildItem('邮箱', 'email', false)}
      {buildItem('手机', 'phone', false)}
      </Row>
      </Modal>
  );
};

export default Form.create<CreateFormProps>()(AddOrUpdateForm);
