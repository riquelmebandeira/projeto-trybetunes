import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import { getUser, updateUser } from '../services/userAPI';
import noPicture from '../assets/no-picture-big.png';
import '../styles/pages/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
    };
  }

  componentDidMount() {
    getUser()
      .then((userData) => this.setState({ ...userData }));
  }

  handleChange = ({ target }) => {
    const { id } = target;
    const { value } = target;

    this.setState({
      [id]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ ...this.state });

      window.location.href = 'http://localhost:3000/profile';
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { image, name, email, description } = this.state;
    const EMAIL_REGEX = /.+@.+\..+/;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <main>
          <form className="user-profile-form">
            <div className="profile-picture-container">
              <img
                src={ image || noPicture }
                alt="Foto de perfil"
                className="profile-picture"
              />
              <Input
                id="image"
                value={ image }
                onChange={ this.handleChange }
                dataTestId="edit-input-image"
              />
            </div>
            <Input
              labelText="Nome"
              id="name"
              value={ name }
              onChange={ this.handleChange }
              dataTestId="edit-input-name"
            />
            <Input
              labelText="Email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
              dataTestId="edit-input-email"
            />
            <label htmlFor="description">
              Descrição
              <textarea
                id="description"
                value={ description }
                onChange={ this.handleChange }
                data-testid="edit-input-description"
              />
            </label>
            <Link to="/profile">
              <button
                type="submit"
                data-testid="edit-button-save"
                className="save-profile-btn"
                disabled={
                  !image
                || !name
                || !EMAIL_REGEX.test(email)
                || !description
                }
                onClick={ (e) => this.handleSubmit(e) }
              >
                Salvar
              </button>
            </Link>
          </form>
        </main>
      </div>);
  }
}

export default ProfileEdit;
