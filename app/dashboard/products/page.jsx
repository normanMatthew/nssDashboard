import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/products/products.module.css";
import SearchComponent from "@/app/ui/dashboardComponent/searchComponent/searchComponent";
import Pagination from "@/app/ui/dashboardComponent/pagination/paginationComponent";

const ProductsPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <SearchComponent placeholder="Search for a product..." />
                <Link href="/dashboard/products/addNew">
                    <button className={styles.addButton}> Add New </button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.product}>
                                <Image 
                                    src="/noproduct.jpg"
                                    alt="Product"
                                    width={40}
                                    height={40}
                                    className={styles.productImage}
                                /> Test Product
                            </div>
                        </td>
                        <td>Desc</td>
                        <td>$999</td>
                        <td>10.25.2025</td>
                        <td>72</td>
                        <td>
                            <div className={styles.buttons}>

                            <Link href="/dashboard/products/test"> 
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
    )
}

export default ProductsPage;