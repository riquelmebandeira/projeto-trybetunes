import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.setFavorites();
  }

  componentDidUpdate() {
    this.setFavorites();
  }

  setFavorites = async () => {
    this.setState({ favorites: await getFavoriteSongs() });
  }

  handleTrack = async ({ target: { checked } }) => {
    const { trackInfo: trackId } = this.props;

    this.setState({ loading: true });

    if (checked) { await addSong(trackId); } else { await removeSong(trackId); }

    this.setState({ loading: false });
  };

  render() {
    const { trackInfo } = this.props;
    const { loading, favorites } = this.state;

    if (loading) return <Loading />;

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
            checked={ favorites.some((song) => song.trackId === trackInfo.trackId) }
            onChange={ (e) => this.handleTrack(e) }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.object,
  waitForAddSong: PropTypes.func,
  isFavorite: PropTypes.bool,
}.isRequired;

export default MusicCard;
