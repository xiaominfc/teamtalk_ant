/*
 * FileName: index.tsx
 * Project: tt_ucenter
 * Created Date: Saturday August 24th 2019, 17:56:23
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */

import {
	Form,
  } from 'antd';

import { connect } from 'dva';
import { BaseTableList, DataInf } from '../users'
import { StandardTableColumnProps } from '../users/components/StandardTable';
import { DepartItemInf, DepartData } from './data.d';
import AddOrUpdateForm from './components/AddOrUpdateForm';
import React from 'react';


const DepartListNameSpace = 'listDeparts';

@connect(
  (result:{}) => ({
    list: result[DepartListNameSpace],
    loading: result['loading'].models[DepartListNameSpace],
  }),
)
class DepartTableList extends BaseTableList<DepartItemInf, DepartData> {
	workNameSpace=DepartListNameSpace;

	columns: StandardTableColumnProps<DepartItemInf>[] = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		},
		{
		  title: '部门',
		  dataIndex: 'departName',
		},
		{
			title: '父部门',
			dataIndex: 'parentId_value',
		},
		this.statusColumn,
		this.updatedColumn,
    	this.controlColumn,
	  ];


	formatTableData = () => {
		const data = this.getListData();
		return { list: data.departs || [], pagination: data.pagination || {} };
	}


	createForm = () => {
		const parentMethods = {
		  handleAction: this.handleAddOrUpdate,
		  handleModalVisible: this.handleModalVisible,
		};
		const { modalVisible, record } = this.state;
		
		const data = this.getListData();
		return (<AddOrUpdateForm {...parentMethods} modalVisible={modalVisible} record={record} departs={data.departs || []} />);
	  }
}

export default Form.create<DataInf<DepartData>>()(DepartTableList);
