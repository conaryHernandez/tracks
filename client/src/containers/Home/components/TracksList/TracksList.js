import React, { useState } from 'react';
import { List, message } from 'antd';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import PropTypes from 'prop-types';

import AutoSizer from './Autosizer/Autosizer';
import { Spinner } from '../../../../components/UI';
import classes from './TracksList.module.scss';

const TracksList = props => {
  const [loading, setLoading] = useState(false);

  const loadRowData = ({ startIndex, stopIndex }) => {
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

  const infiniteLoader = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop
  }) => (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadRowData}
      rowCount={props.tracks.length}
    >
      {({ onRowsRendered }) => (
        <AutoSizer
          height={height}
          isScrolling={isScrolling}
          onChildScroll={onChildScroll}
          scrollTop={scrollTop}
          onRowsRendered={onRowsRendered}
          tracks={props.tracks}
          onButtonClick={props.onButtonClick}
        />
      )}
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

TracksList.propTypes = {
  tracks: PropTypes.array.isRequired,
  getTracks: PropTypes.func,
  onButtonClick: PropTypes.func
};

TracksList.defaultProps = {
  getTracks: () => {},
  onButtonClick: () => {}
};

export default TracksList;
