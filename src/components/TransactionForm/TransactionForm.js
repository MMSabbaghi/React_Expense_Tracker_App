import { useEffect, useState } from "react";
import styles from "./TransactionForm.module.css";
import { useTransactionsActions } from "../../Providers/TransactionsProvider";

const TransactionForm = ({ selectedTransaction }) => {
  const dispatch = useTransactionsActions();

  let initialTransaction = {
    description: "",
    amount: "",
    type: "income",
  };
  const [transaction, setTransaction] = useState(initialTransaction);

  useEffect(() => {
    setTransaction(setTransaction);
  }, [selectedTransaction]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "addNewTransaction", transaction: transaction });
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
            checked
          />
          <label>expense</label>
          <input
            id="expense"
            type="radio"
            value="expense"
            name="type"
            onChange={changeTypeHandler}
          />
        </div>

        <button
          disabled={
            transaction.type === "" ||
            transaction.description.length < 3 ||
            transaction.amount === ""
          }
          type="submit"
          className={styles.btn}
        >
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
