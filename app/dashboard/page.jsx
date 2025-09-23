import CardComponent from "../ui/dashboardComponent/cardComponent/cardComponent";
import ChartComponent from "../ui/dashboardComponent/chartComponent/chartComponent";
import styles from "../ui/dashboardComponent/dashboard.module.css";
import RightBarComponent from "../ui/dashboardComponent/rightBarComponent/rightBarComponent";
import TransactionComponent from "../ui/dashboardComponent/transactionsComponent/transactionComponent";

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>
                <TransactionComponent />
                <ChartComponent />
            </div>
            <div className={styles.sidebar}>
                <RightBarComponent />
            </div>
        </div>
    )
};

export default Dashboard;