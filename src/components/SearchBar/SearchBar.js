import { useCallback, useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ list, setFilteredList, searchBase }) => {
  const [input, setInput] = useState("");

  const filterList = useCallback(() => {
    setFilteredList(
      list.filter((item) =>
        item[searchBase].toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input, setFilteredList, list, searchBase]);

  useEffect(() => {
    filterList();
  }, [input, list, filterList]);

  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        value={input}
        placeholder="search..."
        onChange={(e) => setInput(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;
