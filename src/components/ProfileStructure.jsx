import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileStructure extends React.Component {
  render() {
    const { name, email, img, about } = this.props;
    return (
      <section>
        <div>
          <img
            src={ img }
            alt="Foto de perfil"
            data-testid="profile-image"
          />
          <Link
            to="/profile/edit"
          >
            Editar perfil
          </Link>
        </div>
        <div>
          <h4>Nome</h4>
          <p>{ name }</p>
        </div>
        <div>
          <h4>Email</h4>
          <p>{ email }</p>
        </div>
        <div>
          <h4>Descrição</h4>
          <p>{ about }</p>
        </div>
      </section>
    );
  }
}

ProfileStructure.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  about: PropTypes.string,
}.isRequired;

export default ProfileStructure;
