/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-02 15:44:22
 * @LastEditTime: 2022-03-24 14:28:14
 * @LastEditors: Please set LastEditors
 * @Description:
 */
import type { SysRole } from '@/utils/enum';
import { isEmpty, isEqual } from 'lodash';
import React, { useState } from 'react';
import KeepAlive from 'react-activation';
import { useModel } from 'umi';

export interface RoleVo {
  createTime: string;
  createUser: number;
  description: string;
  isCancel: number;
  isSys: number;
  roleCode: SysRole;
  roleId: number;
  roleName: string;
  updateTime: string;
  updateUser: number;
}
interface TenantVo {
  createTime: string;
  createUser: number;
  foot: string;
  icon: string;
  isActive: number;
  logo: string;
  tenantCode: string;
  tenantId: any;
  tenantName: string;
  updateTime: string;
  updateUser: number;
}
export interface UserInfoAll {
  cellPhone: string;
  createTime: string;
  createUser: number;
  curtenant: number;
  ddid: string;
  dduserId: string;
  email: string;
  ewechat: string;
  isActive: number;
  menuDTOS: any[];
  password: string;
  roleList: RoleVo[];
  tenantId: any;
  token: string;
  updateTime: string;
  updateUser: number;
  userCode: string;
  userId: number;
  userName: string;
  tenantList: TenantVo[];
  isOrderAudit: boolean;
}

export interface InitialStateType {
  initUserInfo: () => Promise<any>;
  /** 路由 */
  routers?: any[];
  /** 用户角色code集合 */
  roleCodeList?: SysRole[];
  /** 用户信息 */
  userInfo?: UserInfoAll | null;
  /** 按钮级别权限集合 */
  allBtnPermisions?: any;
  /** 导航模式 */
  layoutPosition?: any;
}

const WarpperPage: React.FC = ({ children }: any) => {
  const [globalStorge, setGlobalStorge] = useState<InitialStateType>({} as any);

  console.log('globalStorge: ', globalStorge);
  const masterProps = useModel('@@qiankunStateFromMaster');

  masterProps?.onGlobalStateChange((state: any, prev: any) => {
    console.log('prev: ', prev);
    console.log('state: ', state);
    if (isEqual(state, prev) && isEmpty(globalStorge)) {
      setGlobalStorge(state);
    } else if (!isEqual(state, globalStorge)) {
      setGlobalStorge(state);
    }
  }, true);
  return <div>{React.cloneElement(children, { ...globalStorge, changeGlobal: masterProps?.setGlobalState })}</div>;
};

const KeepPage: React.FC = ({ children, route }: any) => {
  return (
    <KeepAlive
      name={location.pathname}
      id={`${route.name}-${route.icon?.type?.render?.name || 'SmileOutlined'}-`}
      saveScrollPosition="screen"
    >
      <WarpperPage>{children}</WarpperPage>
    </KeepAlive>
  );
};

export default KeepPage;
