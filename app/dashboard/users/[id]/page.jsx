import React from "react";
import styles from "@/ui/dashboardComponent/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/noavatar.png"
                        alt="Single User"
                        fill
                    />
                </div>
                John Doe
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="John Doe" />
                    <label>Email</label>
                    <input type="email" name="email" placeholder="JohnDoe@gmail.com" />
                    <label>Password</label>
                    <input type="password" name="password" />
                    <label>Phone</label>
                    <input type="text" name="Phone" placeholder="+12345678" />
                    <label>Address</label>
                    <textarea type="text" name="address" placeholder="USA"></textarea>
                    <label>Is Admin?</label>
                    <select name="isAdmin" id="isAdmin">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <label>Is Active?</label>
                    <select name="isActive" id="isActive">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};

export default SingleUserPage;