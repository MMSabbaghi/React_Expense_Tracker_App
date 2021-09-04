import { useEffect, useState } from "react";
import styles from "./TransactionForm.module.css";
import { useTransactionsActions } from "../../Providers/TransactionsProvider";
import notify from "../../utils/NotificationManager";

const TransactionForm = ({ selectedTransaction, setSelectedTransaction }) => {
  const dispatch = useTransactionsActions();

  let initialTransaction = {
    description: "",
    amount: "",
    type: "income",
  };
  const [transaction, setTransaction] = useState(initialTransaction);

  useEffect(() => {
    if (selectedTransaction) setTransaction(selectedTransaction);
  }, [selectedTransaction]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (selectedTransaction) {
      dispatch({ type: "updateTransaction", transaction: transaction });
      setSelectedTransaction(null);
      notify("success", "Successfuly Edited !");
    } else {
      dispatch({ type: "addNewTransaction", transaction: transaction });
      notify("success", "Successfuly Adedd !");
    }

    setTransaction(initialTransaction);
  };

  const changeHandler = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const changeTypeHandler = (e) => {
    if (e.target.checked) changeHandler(e);
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.transaction_form}>
        <input
          type="text"
          placeholder="description..."
          value={transaction.description}
          name="description"
          onChange={changeHandler}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="amount..."
          min="0"
          value={transaction.amount}
          name="amount"
          onChange={changeHandler}
          className={styles.input}
        />
        <div className={styles.type}>
          <label>income</label>
          <input
            id="income"
            type="radio"
            value="income"
            name="type"
            onChange={changeTypeHandler}
            checked={transaction.type === "income"}
          />
          <label>expense</label>
          <input
            id="expense"
            type="radio"
            value="expense"
            name="type"
            onChange={changeTypeHandler}
            checked={transaction.type === "expense"}
          />
        </div>

        <button
          disabled={transaction.description === "" || transaction.amount === ""}
          type="submit"
          className={styles.btn}
        >
          {selectedTransaction ? "Edit Transaction" : "Add Transaction"}
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
