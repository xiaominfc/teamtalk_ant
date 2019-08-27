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
import { DiscoveryItemInf, DiscoveryData } from './data.d';
import React from 'react';
import AddOrUpdateForm from './components/AddOrUpdateForm';


const DiscoveryListNameSpace = 'listDiscoverys';

@connect(
  (result:{}) => {
    return ({
    list: result[DiscoveryListNameSpace],
    loading: result['loading'].models[DiscoveryListNameSpace],
  });
  },
)
class DisconveryTableList extends BaseTableList<DiscoveryItemInf, DiscoveryData> {
	workNameSpace='listDiscoverys';

	columns: StandardTableColumnProps<DiscoveryItemInf>[] = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		},
		{
		  title: '标题',
		  dataIndex: 'itemName',
		},
		{
			title: 'url',
			dataIndex: 'itemUrl',
		},
		this.updatedColumn,
    	this.controlColumn,
	  ];

	formatTableData = () => {
		const data = this.getListData();
		return { list: data.discoverys || [], pagination: data.pagination || {} };
	}

	createForm = () => {
		const parentMethods = {
		  handleAction: this.handleAddOrUpdate,
		  handleModalVisible: this.handleModalVisible,
		};
		const { modalVisible, record } = this.state;
		return (<AddOrUpdateForm {...parentMethods} modalVisible={modalVisible} record={record} />);
	  }
}

export default Form.create<DataInf<DiscoveryData>>()(DisconveryTableList);
