import Image from "next/image";
import styles from "./rightBarComponent.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const RightBarComponent = () => {
    return (
        // right bar component one
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image 
                        src="/astronaut.png"
                        alt="astronaut"
                        fill
                        className={styles.bg}
                    />
                </div>
                <div className={styles.texts}>
                    <h4 className={styles.notification}>Available Now</h4>
                    <h3 className={styles.title}>How to use the new version of the admin dashboard.</h3>
                    <p className={styles.subtitle}>It takes four minutes to learn.</p>
                    <p className={styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illo a ad nulla sit, reiciendis.</p>
                    <button className={styles.button}>
                        <MdPlayCircleFilled/>
                        Watch
                    </button>
                </div>
            </div>
            {/* right bar component two */}
            <div className={styles.item}>
                <div className={styles.texts}>
                    <h4 className={styles.notification}>Coming Soon</h4>
                    <h3 className={styles.title}>New server actions are being discoverd daily!</h3>
                    <p className={styles.subtitle}>It takes three minutes to learn.</p>
                    <p className={styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illo a ad nulla sit, reiciendis.</p>
                    <button className={styles.button}>
                        <MdReadMore />
                        Watch
                    </button>
                </div>
            </div>
        </div>
    )
};

export default RightBarComponent;