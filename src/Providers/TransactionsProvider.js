import React, { useContext, useReducer } from "react";

const TransactionsContext = React.createContext();
const TransactionsContextDispatcher = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "addNewTransaction": {
      action.transaction.id = Math.floor(Math.random() * 10000);
      return [...state, action.transaction];
    }
    case "removeTransaction": {
      return state.filter((t) => t.id !== action.id);
    }
    default:
      return state;
  }
};

const initialState = [
  {
    id: 1,
    type: "expense",
    description: "buy coffe",
    amount: 10,
  },
];

const TransactionsProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(reducer, initialState);

  return (
    <TransactionsContext.Provider value={transactions}>
      <TransactionsContextDispatcher.Provider value={dispatch}>
        {children}
      </TransactionsContextDispatcher.Provider>
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
export const useTransactionsActions = () =>
  useContext(TransactionsContextDispatcher);
export default TransactionsProvider;
