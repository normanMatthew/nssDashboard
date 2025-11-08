import React from 'react';
import styles from "@/app/ui/loginComponent/login.module.css";

const LoginPage = () => {
    return (
     <div className={styles.container}>
        <form action="" className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder='username'/>
            <input type="password" placeholder='password'/>
            <button type="submit">Login</button>
        </form>
     </div>
    );
};

export default LoginPage;