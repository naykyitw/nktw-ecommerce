import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import useCart from "@/mycart/mycart";
import cartImg from "./cart.svg";

import styles from "./Header.module.css";

const Header = () => {
  const totalqty = useCart((state: any) => state.totalqty);
  const [mytotalqty, setTotalqty] = useState();

  useEffect(() => {
    setTotalqty(totalqty);
  }, [totalqty]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/search/all-products/1">
          <motion.p
            animate={{ x: [0, 100, 0], opacity: 1, scale: 1 }}
            className={styles.heading}
            transition={{
              duration: 2,
              delay: 0.3,
              ease: [0.8, 0.71, 1, 1.5],
            }}
            initial={{ opacity: 0, scale: 1 }}
          >
            NK.TW
          </motion.p>
        </Link>
        <div className={styles.cartContainer}>
          <Link href="/checkout">
            <motion.div
              whileHover={{ scale: [null, 1.3, 1.1] }}
              transition={{ duration: 0.3 }}
              key={cartImg}
            >
              <Image
                src={cartImg}
                alt="img"
                width="26"
                height="26"
                className={styles.cart}
              />
            </motion.div>

            {mytotalqty !== 0 && <div className={styles.qty}>{mytotalqty}</div>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
