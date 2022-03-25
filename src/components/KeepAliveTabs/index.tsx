import { usePersistFn } from '@umijs/hooks';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Tabs } from 'antd';
import React from 'react';
import { useAliveController } from 'umi';
import styles from './index.less';
import Tab from './tab';

enum CloseTabKey {
  Others = 'others',
  ToRight = 'toRight',
}

const KeepAliveTabs = () => {
  const { getCachingNodes, dropScope } = useAliveController();
  const cachingNodes = getCachingNodes();

  const handleTabsMenuClick = usePersistFn(
    (tabKey: string): MenuProps['onClick'] =>
      (event) => {
        const { key, domEvent } = event;

        const rightList = cachingNodes.slice(Number(tabKey) + 1);
        const otherList = cachingNodes.filter(
          (_, index: number) => Number(tabKey) !== index,
        );

        domEvent.stopPropagation();
        if (key === CloseTabKey.Others) {
          otherList.forEach(async (item) => {
            await dropScope(item.name!);
          });
        } else if (key === CloseTabKey.ToRight) {
          rightList.forEach(async (item) => {
            await dropScope(item.name!);
          });
        }
      },
  );

  const setMenu = usePersistFn((key: string, index: number) => (
    <Menu onClick={handleTabsMenuClick(key)}>
      <Menu.Item disabled={cachingNodes.length === 1} key={CloseTabKey.Others}>
        关闭其他
      </Menu.Item>
      <Menu.Item
        disabled={cachingNodes.length === index + 1}
        key={CloseTabKey.ToRight}
      >
        关闭右侧
      </Menu.Item>
    </Menu>
  ));

  const renderTab = usePersistFn(
    (tab: React.ReactNode, key: string, index: number) => (
      <Tabs.TabPane
        tab={
          <span key={key} onContextMenu={(event) => event.preventDefault()}>
            <Dropdown overlay={setMenu(key, index)} trigger={['contextMenu']}>
              <span className={styles.tabTitle}>{tab}</span>
            </Dropdown>
          </span>
        }
        key={key}
      />
    ),
  );

  return (
    <div style={{ background: '#fff', width: '100%' }}>
      {/* <ul className={styles['alive-tabs']}>
        {cachingNodes.map((node, idx) =>
          // <Tab key={idx} node={node} />
          renderTab(<Tab node={node} />, `${idx}`, idx),
        )}
      </ul> */}
      <ul className={styles['alive-tabs']}>
        <Tabs tabBarGutter={5} activeKey="none">
          {cachingNodes.map((node, idx) =>
            renderTab(<Tab node={node} />, `${idx}`, idx),
          )}
        </Tabs>
      </ul>
    </div>
  );
};

export default KeepAliveTabs;
