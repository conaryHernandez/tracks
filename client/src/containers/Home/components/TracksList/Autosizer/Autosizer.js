import React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VirtualizedList from '../VList/VList';

const autoSize = ({
  height,
  isScrolling,
  onChildScroll,
  scrollTop,
  onRowsRendered,
  tracks,
  onButtonClick
}) => (
  <AutoSizer disableHeight>
    {({ width }) => (
      <VirtualizedList
        height={height}
        isScrolling={isScrolling}
        onChildScroll={onChildScroll}
        scrollTop={scrollTop}
        onRowsRendered={onRowsRendered}
        width={width}
        tracks={tracks}
        onButtonClick={onButtonClick}
      />
    )}
  </AutoSizer>
);

export default autoSize;
