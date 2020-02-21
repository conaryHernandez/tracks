import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, Typography, Result } from 'antd';

import { Spinner } from '../../components/UI';
import * as actions from '../../store/actions';

import classes from './Home.module.scss';
import TracksList from './components/TracksList/TracksList';
import ModalContent from './components/ModalContent/ModalContent';

const { Title } = Typography;

const Home = props => {
  const { onGetTracks, tracks = [], onGetSingleTrack, singleTrack } = props;

  const [fetchLoading, setFetchLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = trackId => {
    setFetchLoading(true);
    setVisible(true);
    onGetSingleTrack(trackId);
  };

  useEffect(() => {
    onGetTracks();
  }, [onGetTracks]);

  useEffect(() => {
    setFetchLoading(false);
  }, [singleTrack]);

  const handleOk = () => setVisible(false);

  if (props.tracks === 0) {
    return (
      <div className={classes.Tracks}>
        <div className={classes.Container}>
          <div className={classes.TracksTitle}>
            <Title>Catalog</Title>
            <p>Found: {tracks.length} tracks.</p>
          </div>
          <Result
            title="No Tracks found."
            extra={
              <Button type="primary" key="console">
                <Link to="/">Refresh</Link>
              </Button>
            }
          />
        </div>
      </div>
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
            <ModalContent singleTrack={singleTrack} />
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
