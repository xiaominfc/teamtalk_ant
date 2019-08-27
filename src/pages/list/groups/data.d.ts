/*
 * FileName: data.d.ts
 * Project: tt_ucenter
 * Created Date: Saturday August 24th 2019, 17:58:29
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */


import { TableListPagination,PageTableListData,BaseItemInf } from '../users/data';

export interface GroupItemInf extends BaseItemInf{
	name:string;
	avatar:string;
	status:string;
	updated:string;
	type:string;
}

export interface GroupData extends PageTableListData{
    groups: GroupItemInf[];
}
