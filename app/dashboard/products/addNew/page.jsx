import React from "react";
import styles from "../../../ui/products/addProduct/addProduct.module.css";

const AddNewProduct = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder="title" name="title" required />
                <select name="category" id="category" required>
                    <option value="" disabled selected>Select category</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="phone">Phone</option>
                    <option value="computer">Computer</option>
                </select>
                <input type="number" placeholder="price" name="price" />
                <input type="number" placeholder="stock" name="stock" />
                <input type="number" placeholder="color" name="color" />
                <input type="number" placeholder="size" name="size" />
                <textarea name="desc" id="desc" rows="16" placeholder="description"></textarea>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
};

export default AddNewProduct;