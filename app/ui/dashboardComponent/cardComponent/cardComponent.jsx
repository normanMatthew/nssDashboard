import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./cardComponent.module.css";

const CardComponent = () => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24} />
            <div className={styles.text}>
                <h4 className={styles.title}>Total Users</h4>
                <p className={styles.number}>10.273</p>
                <p className={styles.detail}><span className={styles.positive}>12%</span>more than the previous week.</p>
            </div>
        </div>
    )
};

export default CardComponent;