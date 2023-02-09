import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpenses, addExpenses, saveEdit } from '../redux/actions';

import './Form.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    id: 0,
    tag: 'Alimentação',
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

  editorExpense = () => {
    const { dispatch, idEdit } = this.props;
    this.setState({
      id: idEdit,
    }, () => dispatch(saveEdit(this.state)));
    // dispatch(saveEdit(this.state));
  };

  saveExpense = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    const { dispatch } = this.props;
    // Chamar uma função para controlar a action
    dispatch(addExpenses(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencys, editor } = this.props;
    const keys = currencys.filter((iten) => iten !== 'USDT');
    return (
      <div className="form">
        <div className="campos-form">
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
              name="tag"
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
        </div>

        <button onClick={ !editor ? this.saveExpense : this.editorExpense }>
          {
            !editor ? 'Adicionar despesa' : 'Editar despesa'
          }
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencys: state.wallet.currencies,
  editor: state.wallet.editor,
  idEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencys: PropTypes.shape(PropTypes.objectOf()).isRequired,
  editor: PropTypes.bool.isRequired,
  idEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
