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
    const { trackInfo, isFavorite } = this.props;
    const { trackId, trackName, previewUrl, artworkUrl100 } = trackInfo;

    const { loading, favorites } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="music-card-container" key={ trackId }>
        { isFavorite && <img src={ artworkUrl100 } alt="foto do álbum" />}
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
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favorites.some((song) => song.trackId === trackId) }
            onChange={ (e) => this.handleTrack(e) }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool,
};

MusicCard.defaultProps = {
  isFavorite: false,
};

export default MusicCard;
