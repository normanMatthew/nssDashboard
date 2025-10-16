import Image from "next/image";
import styles from "./transactionsComponent.module.css";

const TransactionComponent = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td scope="col">Name</td>
                        <td scope="col">Status</td>
                        <td scope="col">Date</td>
                        <td scope="col">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {/* first row */}
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/noavatar.png"
                                    alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                John Doe
                            </div>
                        </td>
                        <td className={`${styles.status} ${styles.pending}`}>
                            <p>Pending</p>
                        </td>
                        <td>09.23.2025</td>
                        <td>$6,400.00</td>
                    </tr>
                    {/* Second row */}
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/noavatar.png"
                                    alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                John Doe
                            </div>
                        </td>
                        <td className={`${styles.status} ${styles.done}`}>
                            <p>Done</p>
                        </td>
                        <td>09.23.2025</td>
                        <td>$26,400.00</td>
                    </tr>
                    {/* Third row */}
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/noavatar.png"
                                    alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                John Doe
                            </div>
                        </td>
                        <td className={`${styles.status} ${styles.cancelled}`}>
                            <p>Cancelled</p>
                        </td>
                        <td>09.23.2025</td>
                        <td>$63,400.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default TransactionComponent;