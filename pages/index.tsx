import Link from "next/link";
import { motion } from "framer-motion";

import styles from "./page.module.css";

export default function Home() {
  const text = "SHOP WITH US";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <motion.div
          style={{ display: "flex" }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              style={{ marginRight: "5px", marginBottom: "10px" }}
              key={index}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <motion.div whileHover={{ scale: 1.2 }} animate={{ x: [null, 100, 0] }}>
        <Link className={styles.link} href="/search/all-products/1">
          START NOW
        </Link>
      </motion.div>
    </div>
  );
}
