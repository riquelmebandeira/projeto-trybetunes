import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumSongs: '',
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
    };

    this.getAlbumSongs = this.getAlbumSongs.bind(this);
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
    }, () => {
      // result.shift();
      this.setState({
        albumSongs: result,
      });
    });
  }

  render() {
    const { albumSongs, collectionName, artistName, artworkUrl100 } = this.state;

    if (!albumSongs) {
      return (
        <>
          <Header />
          <Loading />
        </>
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
          <MusicCard albumSongs={ albumSongs } />
        </main>
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
