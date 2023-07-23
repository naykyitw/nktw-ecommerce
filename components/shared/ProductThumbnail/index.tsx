import Image from "next/image";
import ImageWithPreload from "../ImageWithPreload";
import cx from "classnames";

import styles from "./index.module.css";

interface ProductThumbnailProps {
  thumbnail: string;
  discountPercentage?: number;
  imgClassName: string;
  alt?: string;
  preload?: boolean;
  loading?: "lazy" | "eager" | undefined;
  width: number;
  height: number;
}

export default function ProductThumbnail({
  thumbnail,
  discountPercentage,
  imgClassName,
  alt = "img",
  preload,
  loading,
  width,
  height,
}: ProductThumbnailProps): JSX.Element {
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
          {discountPercentage}% OFF
        </div>
      )}
    </div>
  );
}