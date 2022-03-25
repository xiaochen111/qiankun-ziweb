/*
 * @Author: chenhaibo-chb0413@163.com
 * @Date: 2022-03-22 14:18:12
 * @Description:
 */
import { CloseCircleOutlined } from '@ant-design/icons';
import findIndex from 'lodash/findIndex';
// import * as allIcons from '@ant-design/icons';
import React from 'react';
import type { CachingNode } from 'react-activation';
import { useAliveController } from 'react-activation';
import { useHistory, useLocation } from 'umi';
import styles from './index.less';

export default function Tab({ node }: any) {
  console.log('node: ', node);
  const history = useHistory();
  const location = useLocation();
  const { getCachingNodes, dropScope } = useAliveController();
  const cachingNodes = getCachingNodes();
  const closable = cachingNodes.length > 1;
  const appName = '/fclmodule';

  function dropTab(e: any) {
    e.stopPropagation();
    const currentName = node.name;

    // 如果关闭激活中的 KeepAlive Tab，需要先离开当前路由
    // 触发 KeepAlive unactivated 后再进行 drop
    if (appName + location.pathname === node.name) {
      const unlisten = history.listen(() => {
        if (unlisten) {
          unlisten();
        }
        setTimeout(() => {
          dropScope(currentName);
        }, 60);
      });

      // 前往排除当前 node 后的最后一个 tab
      const pathList = cachingNodes.filter((node: CachingNode) => node.name !== currentName);

      const dorpIndex = findIndex(cachingNodes, ['name', currentName]);

      const currentPath = dorpIndex === cachingNodes.length - 1 ? pathList.pop() : pathList[dorpIndex];

      history.push(currentPath?.name || '');
    } else {
      dropScope(currentName);
    }
  }

  const TabItemList: any[] = (node.id as string).split('-');

  console.log('location.pathname: ', location.pathname);
  return (
    <li
      className={appName + location.pathname === node.name ? styles.active : ''}
      onClick={() => {
        history.push(node.name.replace(appName, ''));
      }}
    >
      <span className={styles.table_name}>
        {/* {() => React.createElement((allIcons as any)[TabItemList[1]])}{' '} */}
        {TabItemList[0]}
      </span>
      {closable && <CloseCircleOutlined className={styles['close-btn']} onClick={dropTab} />}
    </li>
  );
}
