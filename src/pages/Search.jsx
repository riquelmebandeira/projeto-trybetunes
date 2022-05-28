import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Albums from './Albums';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      storedArtistName: '',
      isSearching: false,
      receivedAlbums: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toSearch = this.toSearch.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      artistName: target.value,
    });
  }

  toSearch() {
    const { artistName } = this.state;
    const storedArtistName = artistName;

    this.setState({
      storedArtistName,
      artistName: '',
      isSearching: true,
    });
    searchAlbumsAPI(storedArtistName)
      .then((response) => this.setState({
        receivedAlbums: response,
        isSearching: false,
      }));
  }

  render() {
    const { isSearching, receivedAlbums, artistName, storedArtistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              value={ artistName }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ artistName.length < 2 }
              onClick={ this.toSearch }
            >
              Procurar
            </button>
          </form>
        </section>
        { isSearching ? <Loading /> : null }
        {
          receivedAlbums ? <Albums
            albums={ receivedAlbums }
            artistName={ storedArtistName }
          />
            : null
        }
      </div>
    );
  }
}

export default Search;
