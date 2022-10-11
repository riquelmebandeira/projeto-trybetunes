import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/pages/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
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

  render() {
    const { favorites } = this.state;

    return (
      <>
        <Header />
        <main className="page-favorites">
          {
            favorites.length < 1 ? <h3>Você não favoritou nenhuma música.</h3>
              : (
                <>
                  <h3 className="favorite-songs-header">Músicas favoritas:</h3>
                  <section>
                    { favorites.map((trackInfo) => (
                      <MusicCard
                        key={ trackInfo.trackId }
                        trackInfo={ trackInfo }
                      />))}
                  </section>
                </>
              )
          }
        </main>
      </>);
  }
}

export default Favorites;
