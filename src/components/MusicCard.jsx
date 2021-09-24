import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };

    this.waitForAddSong = this.waitForAddSong.bind(this);
  }

  async waitForAddSong(trackInfo) {
    this.setState({
      loading: true,
      isChecked: true,
    });
    await addSong(trackInfo);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackInfo } = this.props;
    const { loading, isChecked } = this.state;
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
            checked={ isChecked }
            onChange={ () => this.waitForAddSong(trackInfo) }
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
