import { useState } from "react";
import {
  useTransactions,
  useTransactionsActions,
} from "../../Providers/TransactionsProvider";
import SearchBar from "../SearchBar/SearchBar";
import Transaction from "../Transaction/Transaction";
import styles from "./TransactionList.module.css";
import notify from "../../utils/NotificationManager";

const TransactionList = ({ setSelectedTransaction, selectedTransaction }) => {
  const transactions = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const dispatch = useTransactionsActions();

  const deleteHandler = (transaction) => {
    dispatch({ type: "removeTransaction", id: transaction.id });
    if (transaction.id === selectedTransaction?.id) {
      setSelectedTransaction(null);
    }
    notify("info", "Successfuly Removed !");
  };

  const renderSearchBar = () => {
    return (
      <SearchBar
        list={transactions}
        setFilteredList={setFilteredTransactions}
        searchBase="description"
        key="searchbar"
      />
    );
  };

  if (filteredTransactions.length === 0) {
    return (
      <>
        <h4 className={styles.title}> Transactions </h4>
        {renderSearchBar()}
        <h4 className={styles.not_found}> No Transaction were found ! </h4>
      </>
    );
  }

  return (
    <>
      <h4 className={styles.title}> Transactions </h4>
      {renderSearchBar()}
      {filteredTransactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          onDelete={() => deleteHandler(transaction)}
          onEdit={() => setSelectedTransaction(transaction)}
        />
      ))}
    </>
  );
};

export default TransactionList;
