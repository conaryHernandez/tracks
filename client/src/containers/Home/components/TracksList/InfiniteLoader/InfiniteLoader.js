import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';

import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import AutoSizer from '../Autosizer/Autosizer';

const infiniteLoader = ({
  height,
  isScrolling,
  onChildScroll,
  scrollTop,
  tracks,
  getTracks,
  setLoading,
  onButtonClick
}) => {
  const loadRowData = ({ startIndex, stopIndex }) => {
    setLoading(true);

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      loadedRowsMap[i] = 1;
    }
    if (tracks.length > 10) {
      message.warning('Virtualized List loaded all');

      setLoading(false);
      return;
    }

    getTracks();
    setLoading(false);
  };

  const loadedRowsMap = {};
  const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadRowData}
      rowCount={tracks.length}
    >
      {({ onRowsRendered }) => (
        <AutoSizer
          height={height}
          isScrolling={isScrolling}
          onChildScroll={onChildScroll}
          scrollTop={scrollTop}
          onRowsRendered={onRowsRendered}
          tracks={tracks}
          onButtonClick={onButtonClick}
        />
      )}
    </InfiniteLoader>
  );
};

infiniteLoader.propTypes = {
  height: PropTypes.number,
  isScrolling: PropTypes.bool,
  onChildScroll: PropTypes.func,
  scrollTop: PropTypes.number,
  tracks: PropTypes.array,
  getTracks: PropTypes.func,
  setLoading: PropTypes.func,
  onButtonClick: PropTypes.func
};

infiniteLoader.defaultProps = {
  height: 0,
  isScrolling: false,
  onChildScroll: () => {},
  scrollTop: 0,
  tracks: [],
  getTracks: () => {},
  setLoading: () => {},
  onButtonClick: () => {}
};

export default infiniteLoader;
