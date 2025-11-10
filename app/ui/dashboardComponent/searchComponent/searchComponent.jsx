import { MdSearch } from "react-icons/md";
import styles from "./searchComponent.module.css";
import React from "react";

const SearchComponent = ({placeholder}) => {
    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.input} />
        </div>
    )
}

export default SearchComponent;