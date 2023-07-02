import useCart from "../../../store/store";
import { motion } from "framer-motion";

import styles from "./index.module.css";

export default function UpdateProductQty({ product }) {
  const mycart = useCart((state) => state.cartContent);
  const addTocart = useCart((state) => state.addTocart);
  const updatecart = useCart((state) => state.updatecart);
  const removeFromCart = useCart((state) => state.removeFromCart);

  const addProduct = () => {
    const newProductState = mycart.findIndex((item) => item.id === product.id);
    if (newProductState !== -1) {
      mycart[newProductState].quantity++;
      const totalPlusMinusInd = 1;
      if (product.price)
        updatecart({ params: product, mycart, totalPlusMinusInd });
    } else {
      if (product) addTocart(product);
    }
  };

  const removeProduct = () => {
    const newProductState = mycart.findIndex((item) => item.id === product.id);
    if (newProductState !== -1) {
      if (product?.quantity === 1) {
        removeFromCart(product);
      } else {
        mycart[newProductState].quantity--;
        const totalPlusMinusInd = -1;
        updatecart({ params: product, mycart, totalPlusMinusInd });
      }
    }
  };
  return (
    <div className={styles.btnContainer}>
      <motion.div
        whileHover={{ scale: [null, 1.1, 1.1] }}
        transition={{ duration: 1 }}
        cx={500}
      >
        <button className={styles.button} onClick={() => removeProduct()}>
          -
        </button>
      </motion.div>
      {product?.quantity}
      <motion.div
        whileHover={{ scale: [null, 1.1, 1.1] }}
        transition={{ duration: 1 }}
        cx={500}
      >
        <button className={styles.button} onClick={() => addProduct()}>
          +
        </button>
      </motion.div>
    </div>
  );
}
