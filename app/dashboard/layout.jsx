import Navbar from "../ui/dashboardComponent/navbarComponent/navbar";
import Sidebar from "../ui/dashboardComponent/sidebarComponent/sidebar";
import styles from '../ui/dashboardComponent/dashboard.module.css';


const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>    
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}

export default Layout;