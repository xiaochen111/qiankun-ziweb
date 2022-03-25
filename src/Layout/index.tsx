/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2021-08-05 09:50:48
 * @LastEditTime: 2022-03-22 14:26:04
 * @LastEditors: Please set LastEditors
 * @Description:
 */
import KeepAliveTabs from '@/components/KeepAliveTabs';
import { Affix } from 'antd';
import { useLocation, useModel } from 'umi';
// import { KeepAlive, useModel } from 'umi';

const Layout: React.FC = (props: any) => {
  console.log('props: ', props);
  const { children, route } = props;
  const location = useLocation();

  // console.log('children: ', children);
  return (
    <>
      <Affix offsetTop={49}>
        <KeepAliveTabs />
      </Affix>
      {children}
    </>
  );
};

export default Layout;
