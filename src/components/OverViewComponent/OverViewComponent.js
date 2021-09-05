import TransactionForm from "../TransactionForm/TransactionForm";
import { useCallback, useEffect, useState } from "react";
import { useTransactions } from "../../Providers/TransactionsProvider";
import formatNumber from "../../utils/formatNumber";
import { CSSTransition } from "react-transition-group";

import styles from "./OverViewComponent.module.css";
import "./css_transition.css";

const OverViewComponent = ({ selectedTransaction, setSelectedTransaction }) => {
  const [showForm, setShowForm] = useState(false);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const transactions = useTransactions();

  const calculateResult = useCallback(
    (type) => {
      let result = transactions.filter((t) => t.type === type);
      if (result.length === 0) return 0;
      return result.map((t) => +t.amount).reduce((total, tra) => total + tra);
    },
    [transactions]
  );

  useEffect(() => {
    setExpense(calculateResult("expense"));
    setIncome(calculateResult("income"));
  }, [transactions, calculateResult]);

  useEffect(() => {
    setShowForm(selectedTransaction !== null);
  }, [selectedTransaction]);

  const toggleHandler = () => {
    setShowForm((prevState) => !prevState);
    setSelectedTransaction(null);
  };

  return (
    <>
      <div className={styles.header}>
        <span>
          Balance :{" "}
          <span
            style={{
              color: income - expense < 0 ? "#dc143a" : "#5a8d03",
              fontWeight: "bold",
            }}
          >
            {formatNumber(income - expense)}
          </span>
        </span>
        <button onClick={toggleHandler}>{showForm ? "Cancel" : "Add"}</button>
      </div>

      <CSSTransition
        in={showForm}
        timeout={200}
        unmountOnExit
        classNames="display"
      >
        <TransactionForm
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />
      </CSSTransition>

      <div className={styles.result_section}>
        <div>
          expense : <span id={styles.expense}>{formatNumber(expense)}</span>
        </div>
        <div>
          income : <span id={styles.income}>{formatNumber(income)}</span>
        </div>
      </div>
    </>
  );
};

export default OverViewComponent;
