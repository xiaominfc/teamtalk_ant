/*
 * FileName: data.d.ts
 * Project: tt_ucenter
 * Created Date: Saturday August 24th 2019, 17:58:29
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */


import { TableListPagination,PageTableListData,BaseItemInf } from '../users/data';

export interface DiscoveryItemInf extends BaseItemInf{
	itemName:string;
	itemUrl:string;
	itemPriority:string;
	status:string;
	updated:string;
}

export interface DiscoveryData extends PageTableListData{
    discoverys: DiscoveryItemInf[];
}
