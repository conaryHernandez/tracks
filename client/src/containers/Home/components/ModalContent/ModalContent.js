import React from 'react';
import Proptypes from 'prop-types';
import { Icon } from 'antd';

const ModalContent = props => {
  const { singleTrack } = props;

  return (
    <>
      <p>
        <Icon type="customer-service" /> Track Title: {singleTrack?.track_title}
      </p>
      <p>
        <Icon type="crown" /> Artist: {singleTrack?.artist}
      </p>
    </>
  );
};

ModalContent.propTypes = {
  singleTrack: Proptypes.object
};

ModalContent.defaultProps = {
  singleTrack: {}
};

export default ModalContent;
