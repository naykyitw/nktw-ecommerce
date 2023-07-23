import Head from "next/head";
import Image from "next/image";

interface ProductThumbnailProps {
  src: string;
  className?: string;
  alt?: string;
  preload?: boolean | "auto" | "metadata" | "none";
  loading?: "lazy" | "eager" | undefined;
  width: number;
  height: number;
  onClick?: () => void;
}

export default function ProductThumbnail({
  src,
  className,
  alt,
  preload,
  loading,
  width,
  height,
  onClick,
}: ProductThumbnailProps): JSX.Element {
  let helmet = (
    <Head>
      <link
        rel="preload"
        fetchpriority={preload === true ? "high" : "auto"}
        as="image"
        href={src}
      />
    </Head>
  );

  return (
    <>
      {helmet}
      <Image
        loading={loading}
        src={src}
        alt={alt || "img"}
        className={className}
        width={width}
        height={height}
        onClick={onClick}
      />
    </>
  );
}
