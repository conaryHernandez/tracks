import React, { useState } from 'react';
import { List, message, Icon, Button } from 'antd';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import { Spinner } from '../../../components/UI';

import classes from './TracksList.module.scss';

const TracksList = props => {
  const [loading, setLoading] = useState(false);

  const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    setLoading(true);

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      loadedRowsMap[i] = 1;
    }
    if (props.tracks.length > 10) {
      message.warning('Virtualized List loaded all');

      setLoading(false);
      return;
    }

    props.getTracks();
    setLoading(false);
  };

  const loadedRowsMap = {};
  const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

  const renderItem = ({ index, key, style }) => {
    const item = props.tracks[index];

    return (
      <List.Item key={key} style={style}>
        <Icon type="customer-service" />
        <List.Item.Meta title="Track" description={item} />
        <Button
          type="primary"
          icon="unordered-list"
          onClick={() => props.onButtonClick(item)}
        >
          Details
        </Button>
      </List.Item>
    );
  };

  const vlist = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
    onRowsRendered,
    width
  }) => (
    <VList
      autoHeight
      height={height}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      overscanRowCount={2}
      rowCount={props.tracks.length}
      rowHeight={73}
      rowRenderer={renderItem}
      onRowsRendered={onRowsRendered}
      scrollTop={scrollTop}
      width={width}
    />
  );
  const autoSize = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
    onRowsRendered
  }) => (
    <AutoSizer disableHeight>
      {({ width }) =>
        vlist({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
          width
        })
      }
    </AutoSizer>
  );
  const infiniteLoader = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop
  }) => (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={handleInfiniteOnLoad}
      rowCount={props.tracks.length}
    >
      {({ onRowsRendered }) =>
        autoSize({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered
        })
      }
    </InfiniteLoader>
  );

  return (
    <List className={classes.TracksList}>
      {props.tracks.length > 0 && (
        <WindowScroller>{infiniteLoader}</WindowScroller>
      )}
      {loading && <Spinner />}
    </List>
  );
};

export default TracksList;
