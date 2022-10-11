import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/ProfileStructure.css';
import noPicture from '../assets/no-picture-big.png';

class ProfileStructure extends React.Component {
  render() {
    const { name, email, image, description } = this.props;

    return (
      <section className="user-profile-container">
        <div className="edit-section">
          <img
            src={ image || noPicture }
            alt="Foto de perfil"
            data-testid="profile-image"
            className="mb-sm"
          />
          <Link
            to="/profile/edit"
            className="profile-edit-btn"
          >
            Editar perfil
          </Link>
        </div>
        <h4>Nome</h4>
        <p className="mb-sm">{ name }</p>
        <h4>E-mail</h4>
        <p className="mb-sm">{ email || 'Você ainda não inseriu seu email.' }</p>
        <h4>Descrição</h4>
        <p>{ description || 'Você ainda não inseriu uma descrição' }</p>
      </section>
    );
  }
}

ProfileStructure.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
}.isRequired;

export default ProfileStructure;
