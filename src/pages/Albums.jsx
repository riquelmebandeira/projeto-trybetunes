import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/pages/Albums.css';

class Albums extends React.Component {
  render() {
    const { albums, artistName: name } = this.props;
    if (albums.length < 1) return <h3>Nenhum álbum foi encontrado</h3>;

    return (
      <main>
        <h3>{`Resultado de álbuns de: ${name}`}</h3>
        <section className="albums-cards-container">
          { albums.map(({
            artistName,
            collectionName,
            collectionId,
            artworkUrl100,
          }) => (
            <div key={ collectionId }>
              <img src={ artworkUrl100 } alt="Capa do álbum" />
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                { collectionName }
              </Link>
              <p>
                {artistName}
              </p>
            </div>))}
        </section>
      </main>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.array,
}.isRequired;

export default Albums;
