import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                Norman Software Solutions, LLC.
            </div>
            <div className={styles.text}>
                All Rights Reserved.
            </div>
        </div>
    );
};

export default Footer;