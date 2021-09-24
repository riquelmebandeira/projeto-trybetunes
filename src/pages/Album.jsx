import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumSongs: '',
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      loading: true,
    };

    this.getAlbumSongs = this.getAlbumSongs.bind(this);
    this.waitForAddSong = this.waitForAddSong.bind(this);
  }

  componentDidMount() {
    this.getAlbumSongs();
  }

  async getAlbumSongs() {
    const { match: { params } } = this.props;
    const result = await getMusics(params.id);
    const { artistName, collectionName, artworkUrl100 } = result[0];
    this.setState({
      artistName,
      collectionName,
      artworkUrl100,
      albumSongs: result,
      loading: false,
    });
  }

  async waitForAddSong(trackInfo) {
    this.setState({
      loading: true,
    });
    await addSong(trackInfo);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { albumSongs, collectionName, artistName, artworkUrl100, loading } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          <section>
            <img src={ artworkUrl100 } alt="Capa do álbum" />
            <h3 data-testid="album-name">
              { collectionName }
            </h3>
            <span data-testid="artist-name">
              { artistName }
            </span>
          </section>
          <section>
            { albumSongs.map((trackInfo, index) => {
              if (index === 0) return null;
              return (
                <MusicCard
                  key={ trackInfo.trackId }
                  trackInfo={ trackInfo }
                  waitForAddSong={ this.waitForAddSong }
                />);
            })}
          </section>
        </main>
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
