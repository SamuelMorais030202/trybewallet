import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../logo.png';
import vector from '../vector.png';
import user from '../user.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sumExpenses = expenses.reduce((acc, acr) => (
      acc + (acr.value * acr.exchangeRates[acr.currency].ask)
    ), 0).toFixed(2);
    // const sumExpenses = expenses.map((item) => Number(item.value));
    // console.log(sumExpenses);
    return (
      <header>
        <h1>
          {' '}
          <img src={ logo } alt="logo-trybe" />
        </h1>
        <p className="expense">
          <img src={ vector } alt="Vector imagem" />
          Total de despesas:
          <span data-testid="total-field">
            {sumExpenses}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
        <p data-testid="email-field" className="email-user">
          <img src={ user } alt="Imageuser" />
          { ' ' }
          { email }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Header);
