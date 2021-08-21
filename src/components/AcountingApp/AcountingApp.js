import TransactionsProvider from "../../Providers/TransactionsProvider";
import OverViewComponent from "../OverViewComponent/OverViewComponent";
import TransactionList from "../TransactionList/TransactionList";
import styles from "./AcountingApp.module.css";

const AcountingApp = () => {
  return (
    <>
      <TransactionsProvider>
        <div className={styles.container}>
          <OverViewComponent />
          <TransactionList />
        </div>
      </TransactionsProvider>
    </>
  );
};

export default AcountingApp;
