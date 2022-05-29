import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import headerLogo from '../assets/header-logo.png';
import noPicture from '../assets/no-picture-small.png';
import '../styles/components/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
    };
  }

  componentDidMount() {
    getUser()
      .then((response) => {
        this.setState({ ...response });
      });
  }

  render() {
    const { name, image } = this.state;

    if (!name) return <Loading />;

    return (
      <header data-testid="header-component">
        <img
          className="trybetunes-logo"
          src={ headerLogo }
          alt="logotipo do TrybeTunes"
        />
        <div className="username-container">
          <img
            src={ image || noPicture }
            alt="Foto de perfil"
          />
          <span data-testid="header-user-name">
            { name }
          </span>
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Pesquisa
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
