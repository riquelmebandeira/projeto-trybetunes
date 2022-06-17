import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/AlbumsList.css';
import AlbumCard from './AlbumCard';

class Albums extends React.Component {
  render() {
    const { albums, artistName } = this.props;

    return (
      <main>
        { albums.length < 1 ? <h3>Nenhum álbum foi encontrado</h3>
          : (
            <section className="albums-section">
              <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
              <div className="albums-cards-container">
                {albums.map((album, index) => <AlbumCard key={ index } data={ album } />)}
              </div>
            </section>
          ) }
      </main>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.array,
  artistName: PropTypes.string,
}.isRequired;

export default Albums;
