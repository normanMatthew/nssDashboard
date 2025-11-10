"use client"
import { usePathname } from "next/navigation";
import styles from "../menuLinkComponent/menuLink.module.css";
import Link from "next/link";
import React from "react";

const MenuLink = ({item}) => {

    const pathname = usePathname();
    
    return (
        <Link href={item.path} className={`${styles.container} ${pathname === item.path ? styles.active : ""}`}>
            {item.icon}
            {item.title}
        </Link>
    )
}

export default MenuLink;