import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div className="table-wallet">
        <table>
          <thead>
            <th>Tag</th>
            <th>Descrição</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const { exchangeRates } = expense;
                return (
                  <tr key={ expense.id }>
                    <td>{expense.tag}</td>
                    <td>{expense.description}</td>
                    <td>{expense.method}</td>
                    <td>{Number(expense.value).toFixed(2)}</td>
                    <td>{ exchangeRates[expense.currency].name }</td>
                    <td>{ Number(exchangeRates[expense.currency].ask).toFixed(2) }</td>
                    <td>
                      {
                        (
                          exchangeRates[expense.currency].ask * Number(expense.value)
                        ).toFixed(2)
                      }
                    </td>
                    <td>BRL</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        onClick={ () => dispatch(editExpense(expense.id)) }
                      >
                        Editar
                      </button>
                      /
                      <button
                        data-testid="delete-btn"
                        onClick={ () => dispatch(deletExpense(expense.id)) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape.isRequired,
  dispatch: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Table);
