import styles from "./Transaction.module.css";
import formatNumber from "../../utils/formatNumber";
import { BiTrashAlt } from "react-icons/bi";

const Transaction = ({ transaction, onDelete }) => {
  return (
    <>
      <div
        className={styles.transaction_item}
        style={{
          borderRightColor:
            transaction.type === "expense" ? "#dc143a" : "#5a8d03",
        }}
      >
        <p> {transaction.description}</p>
        <div className={styles.right}>
          <span> {formatNumber(transaction.amount)} </span>
          <BiTrashAlt className={styles.remove_icon} onClick={onDelete} />
        </div>
      </div>
    </>
  );
};

export default Transaction;
