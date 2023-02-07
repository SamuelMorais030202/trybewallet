// Coloque aqui suas actions
export const actionUser = (email) => ({
  type: 'INCREMENT_EMAIL',
  payload: email,
});

const URL = 'https://economia.awesomeapi.com.br/json/all';

const actionExpenses = (currency) => ({
  type: 'EXPENSES',
  payload: Object.keys(currency).filter((item) => item !== 'USDT'),
});

export const fetchExpenses = () => (dispatch) => fetch(URL)
  .then((response) => response.json())
  .then((currencys) => dispatch(actionExpenses(currencys)));

export const actionSaveExpenses = (expense) => ({
  type: 'ACTION_EXPENSE',
  payload: expense,
});

export const addExpenses = (addState) => (dispatch) => fetch(URL)
  .then((response) => response.json())
  .then((currencys) => dispatch(actionSaveExpenses(
    { ...addState, exchangeRates: currencys },
  )));

// Action de delete
export const deletExpense = (idExpense) => ({
  type: 'DELETE_EXPENSE',
  payload: idExpense,
});

// Action de edição
export const editExpense = (idExpense) => ({
  type: 'EDIT_EXPENSE',
  payload: idExpense,
});

export const saveEditExpense = (saveExpense) => ({
  type: 'SAVE_EXPENSE',
  payload: saveExpense,
});

export const saveEdit = (save) => (dispatch) => fetch(URL)
  .then((response) => response.json())
  .then((currencys) => dispatch(saveEditExpense(
    { ...save, exchangeRates: currencys },
  )));
