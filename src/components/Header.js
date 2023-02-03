import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        <h1>Header wallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p>
          <span data-testid="total-field">{sumExpenses}</span>
          <span data-testid="header-currency-field">BRL</span>
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
