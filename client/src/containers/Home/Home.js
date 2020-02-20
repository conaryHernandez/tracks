import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Modal, Typography, Result } from 'antd';

import { Spinner } from '../../components/UI';
import * as actions from '../../store/actions';

import classes from './Home.module.scss';
import TracksList from './components/TracksList';

const { Title } = Typography;

const Home = props => {
  const { onGetTracks, tracks = [], onGetSingleTrack, singleTrack } = props;

  const [fetchLoading, setFetchLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = trackId => {
    setFetchLoading(true);
    setVisible(true);
    onGetSingleTrack(trackId);
    setFetchLoading(false);
  };

  useEffect(() => {
    onGetTracks();
  }, [onGetTracks]);

  const handleOk = () => setVisible(false);

  if (tracks.length === 0) {
    return (
      <Result
        title="No Tracks found."
        extra={
          <Button type="primary" key="console" onClick={() => onGetTracks()}>
            Refresh
          </Button>
        }
      />
    );
  }

  return (
    <div className={classes.Tracks}>
      <div className={classes.Container}>
        <div className={classes.TracksTitle}>
          <Title>Catalog</Title>
          <p>Found: {tracks.length} tracks.</p>
        </div>

        <TracksList
          tracks={tracks}
          getTracks={onGetTracks}
          onButtonClick={openModal}
        />

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
                {singleTrack?.track_title}
              </p>
              <p>
                <Icon type="crown" /> Artist: {singleTrack?.artist}
              </p>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tracks: state.trck.tracks,
    singleTrack: state.trck.track
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTracks: () => dispatch(actions.fetchTracks()),
    onGetSingleTrack: id => dispatch(actions.postSingleTrack(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
