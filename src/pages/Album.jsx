import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../styles/pages/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumSongs: [],
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      loading: true,
    };

    this.getAlbumSongs = this.getAlbumSongs.bind(this);
  }

  componentDidMount() {
    this.getAlbumSongs();
  }

  async getAlbumSongs() {
    const { match: { params } } = this.props;
    const allSongs = await getMusics(params.id);
    const { artistName, collectionName, artworkUrl100 } = allSongs[0];
    this.setState({
      artistName,
      collectionName,
      artworkUrl100,
      albumSongs: allSongs,
      loading: false,
    });
  }

  render() {
    const { albumSongs, collectionName, artistName,
      artworkUrl100, loading } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <main className="album-details-container">
          <section className="album-info-container">
            <img src={ artworkUrl100 } alt="Capa do álbum" />
            <h3 data-testid="album-name">
              { collectionName }
            </h3>
            <span data-testid="artist-name">
              { artistName }
            </span>
          </section>
          <section className="album-songs-container">
            { albumSongs.map((trackInfo, index) => {
              if (index === 0) return null;
              return (
                <MusicCard
                  key={ trackInfo.trackId }
                  trackInfo={ trackInfo }
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
