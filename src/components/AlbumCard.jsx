import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/components/AlbumsList.css';

class AlbumCard extends React.Component {
  render() {
    const { data:
      { artistName, collectionName, collectionId, artworkUrl100 },
    } = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

AlbumCard.propTypes = {
  data: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
