import React from 'react';
import Header from '../components/Header';
import ProfileStructure from '../components/ProfileStructure';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      img: '',
      about: '',
    };
  }

  componentDidMount() {
    getUser()
      .then(({ name, email, image: img, description: about }) => this.setState({
        name,
        email,
        img,
        about,
      }));
  }

  render() {
    const { name, email, img, about } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { !name
          ? <Loading />
          : <ProfileStructure { ...{ name, email, img, about } } /> }
      </div>
    );
  }
}

export default Profile;
