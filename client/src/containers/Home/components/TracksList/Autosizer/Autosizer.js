import React from 'react';
import PropTypes from 'prop-types';
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

autoSize.propTypes = {
  height: PropTypes.number,
  isScrolling: PropTypes.bool,
  onChildScroll: PropTypes.func,
  scrollTop: PropTypes.number,
  tracks: PropTypes.array,
  onRowsRendered: PropTypes.func,
  onButtonClick: PropTypes.func
};

autoSize.defaultProps = {
  height: 0,
  isScrolling: false,
  onChildScroll: () => {},
  scrollTop: 0,
  tracks: [],
  onRowsRendered: () => {},
  onButtonClick: () => {}
};

export default autoSize;
