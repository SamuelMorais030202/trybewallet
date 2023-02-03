// Coloque aqui suas actions
export const actionUser = (email) => ({
  type: 'INCREMENT_EMAIL',
  payload: email,
});

const actionExpenses = (currency) => ({
  type: 'EXPENSES',
  payload: Object.keys(currency).filter((item) => item !== 'USDT'),
});

export const fetchExpenses = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((currencys) => dispatch(actionExpenses(currencys)));

export const actionSaveExpenses = (expense) => ({
  type: 'ACTION_EXPENSE',
  payload: expense,
});

export const addExpenses = (addState) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((currencys) => dispatch(actionSaveExpenses(
    { ...addState, exchangeRates: currencys },
  )));
