import Head from "next/head";
import Image from "next/image";

export default function ProductThumbnail({
  src,
  className,
  alt,
  preload,
  loading,
  width,
  height,
  onClick,
}) {
  let helmet = (
    <Head>
      <link
        rel="preload"
        fetchpriority={preload === true ? "high" : preload}
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
        alt={alt}
        className={className}
        width={width}
        height={height}
        onClick={onClick}
      />
    </>
  );
}
