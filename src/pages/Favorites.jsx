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
      <div data-testid="page-favorites">
        <Header />
        <h3 className="favorite-songs-header">Músicas favoritas:</h3>
        <section className="favorite-songs-container">
          { favorites.map((trackInfo) => (
            <MusicCard
              key={ trackInfo.trackId }
              trackInfo={ trackInfo }
              isFavorite
            />))}
        </section>
      </div>);
  }
}

export default Favorites;
