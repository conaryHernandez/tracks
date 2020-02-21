import React, { useState } from 'react';
import { List } from 'antd';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import PropTypes from 'prop-types';

import InfiniteLoader from './InfiniteLoader/InfiniteLoader';
import { Spinner } from '../../../../components/UI';
import classes from './TracksList.module.scss';

const TracksList = ({ tracks, getTracks, onButtonClick }) => {
  const [loading, setLoading] = useState(false);

  return (
    <List className={classes.TracksList}>
      {tracks.length > 0 && (
        <WindowScroller>
          {params => (
            <InfiniteLoader
              {...params}
              tracks={tracks}
              getTracks={getTracks}
              setLoading={setLoading}
              onButtonClick={onButtonClick}
            />
          )}
        </WindowScroller>
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
