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
import { ProjectItemInf, ProjectData } from './data.d';
import React from 'react';
import AddOrUpdateForm from './components/AddOrUpdateForm';

// const types = ['admin', 'user'];
// const typesTexts = types.map((value, index) => ({ text: value, value: `${index}` }));


const ProjectListNameSpace = 'listProjects';

@connect(
  (result:{}) => {
    return ({
    list: result[ProjectListNameSpace],
    loading: result['loading'].models[ProjectListNameSpace],
  });
  },
)
class ProjectTableList extends BaseTableList<ProjectItemInf, ProjectData> {
	workNameSpace=ProjectListNameSpace;

	columns: StandardTableColumnProps<ProjectItemInf>[] = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '项目名',
			dataIndex: 'name',
		},
		{
			title: '类型',
			dataIndex: 'type',
			render: (val: string) => {
				if (val == '1') {
					return (<span>组织/机构</span>);
				}
				return (<span>自由社交</span>);
			},
		},
		this.updatedColumn,
		this.controlColumn,
	];

	formatTableData = () => {
		const data = this.getListData();
		return { list: data.projects || [], pagination: data.pagination || {} };
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

export default Form.create<DataInf<ProjectData>>()(ProjectTableList);
