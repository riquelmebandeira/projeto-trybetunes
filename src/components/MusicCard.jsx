import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albumSongs } = this.props;
    return (
      <section>
        {albumSongs.map(({ trackName, previewUrl, trackId }, index) => {
          if (index === 0) return null;
          return (
            <div key={ trackId }>
              <span>
                { trackName }
              </span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          );
        })}
      </section>
    );
  }
}

MusicCard.propTypes = {
  albumSongs: PropTypes.array,
}.isRequired;

export default MusicCard;
