import { useState } from "react";
import TransactionsProvider from "../../Providers/TransactionsProvider";
import OverViewComponent from "../OverViewComponent/OverViewComponent";
import TransactionList from "../TransactionList/TransactionList";
import styles from "./AcountingApp.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcountingApp = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  return (
    <>
      <TransactionsProvider>
        <div className={styles.container}>
          <OverViewComponent
            selectedTransaction={selectedTransaction}
            setSelectedTransaction={setSelectedTransaction}
          />
          <TransactionList
            setSelectedTransaction={setSelectedTransaction}
            selectedTransaction={selectedTransaction}
          />
        </div>
        <ToastContainer />
      </TransactionsProvider>
    </>
  );
};

export default AcountingApp;
