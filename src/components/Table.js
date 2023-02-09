import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletExpense, editExpense } from '../redux/actions';

import './Table.css';
import edit from '../edit.png';
import delect from '../delect.png';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div className="table-wallet">
        <table className="table">
          <thead>
            <th>Tag</th>
            <th>Descrição</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar / Excluir</th>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const { exchangeRates } = expense;
                return (
                  <tr key={ expense.id }>
                    <td>{ expense.tag }</td>
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
                      <img
                        className="test"
                        src={ edit }
                        alt="imageedit"
                        onClick={ () => dispatch(editExpense(expense.id)) }
                      />
                      {/* <button
                        className="butn-edit"
                        data-testid="edit-btn"
                        onClick={ () => dispatch(editExpense(expense.id)) }
                      >
                        <img src={ edit } alt="imageedit" />
                      </button> */}
                      <img
                        src={ delect }
                        alt="imagedelet"
                        onClick={ () => dispatch(deletExpense(expense.id)) }
                      />
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
