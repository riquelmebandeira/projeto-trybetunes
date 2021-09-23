import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackInfo } = this.props;
    return (
      <div key={ trackInfo.trackId }>
        <span>
          { trackInfo.trackName }
        </span>
        <audio data-testid="audio-component" src={ trackInfo.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.object,
}.isRequired;

export default MusicCard;
