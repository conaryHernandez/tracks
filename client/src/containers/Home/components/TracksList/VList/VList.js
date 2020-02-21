import React from 'react';
import { List, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

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

vlist.propTypes = {
  height: PropTypes.number,
  isScrolling: PropTypes.bool,
  onChildScroll: PropTypes.func,
  scrollTop: PropTypes.number,
  tracks: PropTypes.array,
  width: PropTypes.number,
  onRowsRendered: PropTypes.func,
  onButtonClick: PropTypes.func
};

vlist.defaultProps = {
  height: 0,
  isScrolling: false,
  onChildScroll: () => {},
  scrollTop: 0,
  tracks: [],
  width: 0,
  onRowsRendered: () => {},
  onButtonClick: () => {}
};

export default vlist;
