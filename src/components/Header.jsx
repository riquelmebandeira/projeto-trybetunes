import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      retrievedInfo: undefined,
    };
  }

  componentDidMount() {
    getUser()
      .then((response) => {
        this.setState({
          retrievedInfo: response,
        });
      });
  }

  render() {
    const { retrievedInfo } = this.state;
    if (!retrievedInfo) return <Loading />;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          { retrievedInfo.name }
        </span>
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
