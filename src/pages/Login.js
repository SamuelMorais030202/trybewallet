import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(actionUser(email));
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  render() {
    const { email, password } = this.state;
    const numberValidate = 5;
    const verification = email
      .includes('@') && email.includes('.com') && password.length > numberValidate;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <input
          type="text"
          value={ email }
          onChange={ this.handleChange }
          name="email"
          data-testid="email-input"
        />
        <input
          type="password"
          value={ password }
          onChange={ this.handleChange }
          name="password"
          data-testid="password-input"
        />
        <button
          onClick={ this.handleClick }
          disabled={ !verification }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
