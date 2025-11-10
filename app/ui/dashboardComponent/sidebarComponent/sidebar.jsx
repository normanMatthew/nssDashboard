import styles from "../../../ui/dashboardComponent/sidebarComponent/sidebar.module.css";
import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter, MdLogout } from 'react-icons/md';
import MenuLink from "./menuLinkComponent/menuLinkComponent";
import Image from 'next/image'
import React from "react";


const menuItems = [
    {
        title: "Pages",
        links: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Products",
                path: "/dashboard/products",
                icon: <MdShoppingBag />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title: "Analytics",
        links: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <MdWork />,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />,
            },
            {
                title: "Teams",
                path: "/dashboard/teams",
                icon: <MdPeople />,
            },
        ],
    },
    {
        title: "User",
        links: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const Sidebar = () => {
    return (
        <div className={styles.container}>
            {/* display user image */}
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="Avatar" width={50} height={50} />
                {/* display user information */}
                <div className={styles.userDetails}>
                    <span className={styles.username}>Matthew Norman</span>
                    <span className={styles.userTitle}>Founder</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((link) => (
                    <li key={link.title}>
                        <span className={styles.cat}>{link.title}</span>
                        {link.links.map((item) => (
                            <MenuLink key={item.title} item={item} />
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout}>
                <MdLogout/>
                Logout
            </button>
        </div>
    )
}

export default Sidebar;