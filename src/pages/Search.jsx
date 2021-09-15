import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      artistName: target.value,
    });
  }

  render() {
    const { artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Procurar
          </button>
        </form>
      </div>);
  }
}

export default Search;
