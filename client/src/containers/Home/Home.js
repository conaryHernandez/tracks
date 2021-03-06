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
  const { onGetTracks, tracks = {}, onGetSingleTrack, error = {}, id } = props;

  const [fetchLoading, setFetchLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const tracksArray = Object.keys(tracks);
  const isTracksListEmpty = tracksArray.length === 0;
  const serverError = Object.keys(error).length > 0 && isTracksListEmpty;
  let fallbackContent = null;

  const openModal = trackId => {
    setFetchLoading(true);
    setVisible(true);
    onGetSingleTrack(trackId);
  };

  useEffect(() => {
    setFetchLoading(true);
    onGetTracks();
  }, [onGetTracks]);

  useEffect(() => {
    setFetchLoading(false);
  }, [id, tracks]);

  const handleOk = () => setVisible(false);

  if (serverError && isTracksListEmpty) {
    fallbackContent = (
      <Result
        title="No Tracks found."
        extra={
          <Button type="primary" key="console">
            <Link to="/">Refresh</Link>
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
          <p>Found: {tracksArray.length || 0} tracks.</p>
        </div>

        {fallbackContent}

        <TracksList
          tracks={tracksArray}
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
            <ModalContent singleTrack={tracks[id]} />
          )}
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tracks: state.trck.tracks,
    id: state.trck.id,
    error: state.trck.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTracks: () => dispatch(actions.fetchTracks()),
    onGetSingleTrack: id => dispatch(actions.postSingleTrack(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
