// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EXPENSES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'ACTION_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses
        .map((expense) => (
          expense.id === state.idToEdit ? action.payload : expense
        ))],
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
