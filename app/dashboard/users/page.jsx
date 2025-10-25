import Pagination from "@/app/ui/dashboardComponent/pagination/paginationComponent";
import SearchComponent from "@/app/ui/dashboardComponent/searchComponent/searchComponent";
import styles from "@/app/ui/dashboardComponent/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

const UsersPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <SearchComponent placeholder="Search for a user..." />
                <Link href="/dashboard/users/add">
                    <button className={styles.addButton}> Add New </button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image 
                                    src="/noavatar.png"
                                    alt="Avatar"
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                /> Matthew Norman
                            </div>
                        </td>
                        <td>testemail@gmail.com</td>
                        <td>10.25.2025</td>
                        <td>Founder</td>
                        <td>Active</td>
                        <td>
                            <div className={styles.buttons}>

                            <Link href="/"> 
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default UsersPage;