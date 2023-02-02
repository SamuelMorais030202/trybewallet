import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchExpenses, actionSaveExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    category: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchExpenses());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveExpense = () => {
    const { value, description, currency, method, category } = this.state;
    const { dispatch } = this.props;
    const obj = {
      value,
      description,
      currency,
      method,
      tag: category,
    };
    dispatch(actionSaveExpenses(obj));
  };

  render() {
    const { value, description } = this.state;
    const { currencys } = this.props;
    const keys = currencys.filter((iten) => iten !== 'USDT');
    return (
      <div>
        <label htmlFor="number">
          Valor:
          <input
            value={ value }
            name="value"
            id="number"
            onChange={ this.handleChange }
            type="number"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Descrição da despesa:
          <input
            name="description"
            value={ description }
            id="description"
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {
              keys.map((currenc) => (
                <option value={ currenc } key={ currenc }>{currenc}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category">
          Categoria da despesa:
          <select
            name="category"
            id="category"
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button onClick={ this.saveExpense }>
          Adicionar despesa
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencys: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencys: PropTypes.shape(PropTypes.objectOf()).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
