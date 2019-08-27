/*
 * FileName: model.ts
 * Project: tt_ucenter
 * Created Date: Saturday August 24th 2019, 21:14:37
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */


import { QueryAction } from '../users/service';
import { DepartItemInf, DepartData } from './data.d';
import { TableListParams } from '../users/data';


import { buildModel } from '../users/model';

const queryAction = new QueryAction<DepartItemInf, TableListParams>('depart');
const Model = buildModel<DepartData>(queryAction, 'listDeparts');
export default Model;
