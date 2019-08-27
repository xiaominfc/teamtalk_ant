/*
 * FileName: login.ts
 * Project: tt_ucenter
 * Created Date: Friday August 23rd 2019, 10:56:57
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */

import request from '@/utils/request';

export async function logoutAction(): Promise<any> {
	return request('/api/logout');
  }
