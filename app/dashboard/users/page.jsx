import SearchComponent from "@/app/ui/dashboardComponent/searchComponent/searchComponent";
import styles from "@/app/ui/dashboardComponent/users/users.module.css";
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
                    
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;