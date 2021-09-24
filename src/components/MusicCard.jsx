import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: undefined,
    };
  }

  componentDidMount() {
    this.isFavoriteSong();
  }

  async isFavoriteSong() {
    const { trackInfo } = this.props;
    let favoriteList = [];
    await getFavoriteSongs()
      .then((response) => { favoriteList = response; });
    const verify = favoriteList.find(
      (favoriteTrack) => favoriteTrack.trackId === trackInfo.trackId,
    );
    if (verify) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  render() {
    const { trackInfo, waitForAddSong } = this.props;
    const { isFavorite } = this.state;
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
        <label htmlFor={ trackInfo.trackId }>
          <input
            type="checkbox"
            id={ trackInfo.trackId }
            data-testid={ `checkbox-music-${trackInfo.trackId}` }
            checked={ isFavorite }
            onClick={ () => waitForAddSong(trackInfo) }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.object,
}.isRequired;

export default MusicCard;
