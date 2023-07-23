import useCart from "@/mycart/mycart";
import { motion } from "framer-motion";
import { Product } from "@/interfaces/interfaces";
import styles from "./index.module.css";

interface UpdateProductQtyProps {
  product: Product;
}

export default function UpdateProductQty({
  product,
}: UpdateProductQtyProps): JSX.Element {
  const mycart = useCart((state) => state.cartContent);
  const addTocart = useCart((state) => state.addTocart);
  const updatecart = useCart((state) => state.updatecart);
  const removeFromCart = useCart((state) => state.removeFromCart);

  const addProduct = (): void => {
    const newProductState = mycart.findIndex(
      (item: any) => item.id === product.id
    );
    if (newProductState !== -1) {
      const totalPlusMinusInd = 1;
      if (product.price)
        updatecart({ params: product, mycart, totalPlusMinusInd });
    } else {
      if (product) addTocart(product);
    }
  };

  const removeProduct = (): void => {
    const newProductState = mycart.findIndex(
      (item: any) => item.id === product.id
    );
    if (newProductState !== -1) {
      if (product?.quantity === 1) {
        removeFromCart(product);
      } else {
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
      >
        <button className={styles.button} onClick={() => removeProduct()}>
          -
        </button>
      </motion.div>
      {product?.quantity}
      <motion.div
        whileHover={{ scale: [null, 1.1, 1.1] }}
        transition={{ duration: 1 }}
      >
        <button className={styles.button} onClick={() => addProduct()}>
          +
        </button>
      </motion.div>
    </div>
  );
}
