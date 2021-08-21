import { useState } from "react";
import styles from "./TransactionForm.module.css";
import { useTransactionsActions } from "../../Providers/TransactionsProvider";

const TransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const dispatch = useTransactionsActions();

  const submitHandler = (e) => {
    e.preventDefault();

    const transaction = {
      type: type,
      description: description,
      amount: amount,
    };

    dispatch({ type: "addNewTransaction", transaction: transaction });

    setAmount("");
    setDescription("");
  };

  const changeTypeHandler = (e) => {
    if (e.target.checked) setType(e.target.value);
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.transaction_form}>
        <input
          type="text"
          placeholder="description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="amount..."
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
          disabled={type === "" || description.length < 3 || amount === ""}
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
