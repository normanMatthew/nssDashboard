import React from "react";
import styles from "@/app/ui/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProductPage = () => {
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
                Test Product
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Testing" />
                    <label>Price</label>
                    <input type="number" name="price" />
                    <label>Stock</label>
                    <input type="number" name="stock" placeholder="23" />
                    <label>Color</label>
                    <input type="text" name="color" placeholder="green" />
                    <label>Size</label>
                    <textarea type="text" name="size" placeholder="description"></textarea>
                    <label>Category</label>
                    <select name="category" id="category">
                        <option value="categoryOne">category one</option>
                        <option value="categoryTwo">category two</option>
                    </select>
                    <label>Description</label>
                    <textarea type="text" id="description" name="description" placeholder="description"></textarea>
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

export default SingleProductPage;