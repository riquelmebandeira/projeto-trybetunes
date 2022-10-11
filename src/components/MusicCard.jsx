import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/components/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  componentDidUpdate() {
    this.setFavorite();
  }

  setFavorite = async () => {
    const { trackInfo: { trackId } } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs.some((song) => song.trackId === trackId);
    this.setState({ isFavorite });
  }

  handleTrack = async ({ target: { checked } }) => {
    const { trackInfo: trackId } = this.props;
    this.setState({ loading: true });
    if (checked) { await addSong(trackId); } else { await removeSong(trackId); }
    this.setState({ loading: false });
  };

  render() {
    const { trackInfo } = this.props;
    const { trackId, trackName, previewUrl, artworkUrl100 } = trackInfo;
    const { loading, isFavorite } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="music-card-container" key={ trackId }>
        <img src={ artworkUrl100 } alt="foto do álbum" />
        <span>
          { trackName }
        </span>
        <audio
          className="audio-player"
          data-testid="audio-component"
          src={ previewUrl }
          controls
          controlsList="nodownload noplaybackrate"
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div className="favorite-icon-container">
          <label htmlFor={ trackId }>
            { isFavorite ? <FaHeart /> : <FaRegHeart />}
          </label>
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ isFavorite }
            onChange={ (e) => this.handleTrack(e) }
          />
        </div>
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
};

export default MusicCard;
