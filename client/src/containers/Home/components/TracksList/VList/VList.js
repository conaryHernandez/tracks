import React from 'react';
import { List, Icon, Button } from 'antd';

import VList from 'react-virtualized/dist/commonjs/List';

const vlist = ({
  height,
  isScrolling,
  onChildScroll,
  scrollTop,
  onRowsRendered,
  width,
  tracks,
  onButtonClick
}) => {
  const renderItem = ({ index, key, style }) => {
    const item = tracks[index];

    return (
      <List.Item key={key} style={style}>
        <Icon type="customer-service" />
        <List.Item.Meta title="Track" description={item} />
        <Button
          type="primary"
          icon="unordered-list"
          onClick={() => onButtonClick(item)}
        >
          Details
        </Button>
      </List.Item>
    );
  };

  return (
    <VList
      autoHeight
      height={height}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      overscanRowCount={2}
      rowCount={tracks.length}
      rowHeight={73}
      rowRenderer={renderItem}
      onRowsRendered={onRowsRendered}
      scrollTop={scrollTop}
      width={width}
    />
  );
};

export default vlist;
