import Link from "next/link";
import cx from "classnames";
import ProductThumbnail from "../ProductThumbnail";
import { Product } from "@/interfaces/interfaces";
import styles from "./index.module.css";

interface ItemProps {
  product: Product;
  className?: string;
  index: number;
}

export default function Item({
  product,
  className,
  index,
}: ItemProps): JSX.Element {
  return (
    <Link
      className={cx(styles.item, className)}
      href="/product/[id]"
      as={`/product/${product.id}`}
    >
      <ProductThumbnail
        thumbnail={product?.thumbnail}
        discountPercentage={product?.discountPercentage}
        imgClassName={styles.img}
        preload={!!(index < 8)}
        height={220}
        width={200}
      />
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{product.title}</p>
          <p className={styles.price}>${product.price}</p>
        </div>
        <p className="ext-sm text-gray-500">${product.description}</p>
      </div>
    </Link>
  );
}
