import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

/**
 * Consultei o repositório do Tiago Sathler para resolver a parte do loading e redirecionamento
 * Link: https://github.com/tryber/sd-014-a-project-trybetunes/pull/4/commits/b21ff5929a1c4319bc51f30cb5c8d0861dbfa018
 */

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      loggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      name: target.value,
    });
  }

  submitForm(event) {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name })
      .then((response) => {
        if (response === 'OK') {
          this.setState({
            loading: false,
            loggedIn: true,
          });
        }
      });
  }

  render() {
    const { loading, loggedIn, name } = this.state;
    const minimalAmount = 3;
    if (loading) return <Loading />;
    if (loggedIn) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            placeholder="Nome"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ name.length < minimalAmount }
            onClick={ this.submitForm }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
