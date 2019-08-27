import {  Form, Input, Modal,Select, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
const { Option } = Select;
import { DepartItemInf } from '../data';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAction: (fieldsValue: DepartItemInf) => void;
  handleModalVisible: () => void;
  record:Partial<DepartItemInf>;
  departs:DepartItemInf[];
}


const AddOrUpdateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAction, handleModalVisible, record,departs } = props;
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
  
  const departSelector = () => {
      const options:JSX.Element[] = [];
          if (departs != null) {
            //if(required) {
            let element = <Option value='0' key='0' >此部门为父部门</Option>; 
            options.push(element);
            //}
            if(!record.parentId ||  record.parentId != '0') {
              departs.map((depart:Partial<DepartItemInf>) => {
                if('0' == depart.parentId && depart.id != record.id) {
                  let element = <Option value={depart.id} key={depart.id} >{depart.departName}</Option>; 
                  options.push(element);
                }
               });
            }
          }
     
      return (<Select
               placeholder="部门"
               style={{ width: '100%' }}
             >
             {options}
      </Select>);
};

let parentId = record.parentId || '0';
let priority = record.priority || '0';

  return (
      <Modal
      destroyOnClose
      title={required?"添加部门":"修改部门"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      >
      
      {buildItem('部门名称', 'departName', required)}
      
      <FormItem>
      {form.getFieldDecorator('parentId', { initialValue: parentId ,
          rules: [{ required, message: '选择父部门', min: 1 }],
      })(departSelector())}
      </FormItem>
      <FormItem wrapperCol={{ span: 20 }} labelCol={{span:4}} label="部门优先级" >
      {form.getFieldDecorator('priority', { initialValue: priority,
      })(<InputNumber min={0} max={10000} />)}
      </FormItem>
      </Modal>
  );
};

export default Form.create<CreateFormProps>()(AddOrUpdateForm);
