import Image from "next/image";
import ImageWithPreload from "../ImageWithPreload";
import cx from "classnames";

import styles from "./index.module.css";

export default function ProductThumbnail({
  thumbnail,
  discountPercentage,
  imgClassName,
  alt = "img",
  preload,
  loading,
  width,
  height,
}) {
  const imgConfig = {
    loading,
    src: thumbnail,
    alt,
    className: imgClassName,
    width,
    height,
  };
  return (
    <div className={cx(styles.imgContainer)}>
      {preload ? <ImageWithPreload {...imgConfig} /> : <Image {...imgConfig} />}

      {discountPercentage && (
        <div className={styles.percentageOff}>
          {parseInt(discountPercentage)}% OFF
        </div>
      )}
    </div>
  );
}
