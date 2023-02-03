import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
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
                <tr key={ expense }>
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
                    <button>Editar</button>
                    /
                    <button>Excluir</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Table);
