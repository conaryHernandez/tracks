import React, { useState, useEffect } from 'react';
import { List, message, Icon, Button, Modal, Typography, Layout } from 'antd';
import axios from 'axios';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import { Spinner } from '../../components/UI';

import classes from './Home.module.scss';

const { Title } = Typography;
const { Content } = Layout;

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState({});

  const [fetchLoading, setFetchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const loadedRowsMap = {};

  const fetchTracks = async () => {
    const response = await axios.get('http://localhost:3030/all_tracks');

    setTracks(response.data.tracks);
  };

  const fetchSingleTrackData = async trackId => {
    const response = await axios.post('http://localhost:3030/track', {
      id: trackId
    });

    setFetchLoading(false);
    setSelectedTrack(response.data.track);
  };

  const openModal = trackId => {
    setFetchLoading(true);
    setVisible(true);
    fetchSingleTrackData(trackId);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    setLoading(true);

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      loadedRowsMap[i] = 1;
    }
    if (tracks.length > 2) {
      message.warning('Virtualized List loaded all');

      setLoading(false);
      return;
    }

    const res = fetchTracks();

    const tracksCopy = [...tracks, res.tracks];

    setTracks(tracksCopy);
    setLoading(false);
  };

  const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const renderItem = ({ index, key, style }) => {
    const item = tracks[index];

    return (
      <List.Item key={key} style={style}>
        <Icon type="customer-service" />
        <List.Item.Meta title="Track" description={item} />
        <Button
          type="primary"
          icon="unordered-list"
          onClick={() => openModal(item)}
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
      rowCount={tracks.length}
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
      rowCount={tracks.length}
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
    <div className={classes.Tracks}>
      <div className={classes.Container}>
        <Title>Tracks</Title>
        <List className={classes.TracksList}>
          {tracks.length > 0 && (
            <WindowScroller>{infiniteLoader}</WindowScroller>
          )}
          {loading && <Spinner />}
        </List>

        <Modal
          title="Track Details"
          visible={visible}
          onOk={handleOk}
          onCancel={() => setVisible(false)}
        >
          {fetchLoading ? (
            <Spinner />
          ) : (
            <>
              <p>
                <Icon type="customer-service" /> Track Title:{' '}
                {selectedTrack?.track_title}
              </p>
              <p>
                <Icon type="crown" /> Artist: {selectedTrack?.artist}
              </p>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Home;
