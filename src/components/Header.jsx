import React from 'react';
import Loading from '../pages/Loading';
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
      </header>
    );
  }
}

export default Header;
