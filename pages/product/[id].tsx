import Head from "next/head";
import { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ProductThumbnail from "@/components/shared/ProductThumbnail";
import useCart from "@/mycart/mycart";
import star from "@/icons/star.svg";
import UpdateProductQty from "@/components/shared/UpdateProductQty";
import ImageWithPreload from "@/components/shared/ImageWithPreload";
import { Product } from "@/interfaces/interfaces";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./index.module.css";

async function getProductsData() {
  const res = await fetch(`https://dummyjson.com/products?limit=100`);
  return res.json();
}

export async function getStaticPaths() {
  const res = await getProductsData();
  const paths = res?.products?.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}
export async function getStaticProps({ params }: any) {
  const { id } = params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  if (!product || product?.message?.includes("not found")) {
    return {
      notFound: true,
    };
  }
  return {
    props: { product },
    revalidate: 60,
  };
}

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps): JSX.Element {
  const addTocart = useCart((state) => state.addTocart);
  const updatecart = useCart((state) => state.updatecart);
  const cartContent = useCart((state) => state.cartContent);
  const totalqty = useCart((state) => state.totalqty);

  const [activeImg, setActiveImg] = useState<string | undefined>();
  const [mycart, setMycart] = useState<Partial<Product>[] | undefined>();
  const [quantity, setQuantity] = useState<number>();
  const [hasProdInCart, setHasProdInCart] = useState<boolean | undefined>();

  useEffect(() => {
    setMycart(cartContent);
    const cartProductId = cartContent.findIndex(
      (item: any) => item.id === product.id
    );
    setHasProdInCart(cartProductId !== -1);
    setQuantity(cartContent?.[cartProductId]?.quantity);
  }, [totalqty]);

  const stars: JSX.Element[] = [];
  const addProduct = (params: Partial<Product>): void => {
    const productId: any = mycart?.findIndex((item) => item.id === params.id);
    if (productId !== -1 && mycart) {
      const totalPlusMinusInd = 1;
      updatecart({ params, mycart, totalPlusMinusInd });
    } else {
      addTocart(params as Product);
    }
  };

  for (let i = 0; i < Math.ceil(product?.rating); i++) {
    stars.push(
      <Image src={star} alt="star" width={18} className={styles.star} key={i} />
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${product?.title}  | NKTW`}</title>
        <meta
          name="description"
          content={`Check out ${product?.title}`}
          key="desc"
        />
      </Head>
      <Breadcrumbs
        links={[
          { url: "/", name: "Home" },
          { url: `/product/${product?.id}`, name: `${product?.title}` },
        ]}
      />
      <div className={styles.product}>
        <div className={styles.imgContainer}>
          <ProductThumbnail
            thumbnail={activeImg ? activeImg : product?.thumbnail}
            discountPercentage={product?.discountPercentage}
            imgClassName={styles.img}
            height={220}
            width={200}
            preload
          />
          <div className={styles.sliderContainer}>
            <Swiper
              slidesPerView={3}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {product?.images?.map((photo: string, index: number) => (
                <div key={`photo${index + 1}`}>
                  <SwiperSlide>
                    <ImageWithPreload
                      src={photo}
                      className={styles.swiperImg}
                      onClick={() => setActiveImg(photo)}
                      alt="slide_img"
                      loading="eager"
                      width={100}
                      height={80}
                      preload
                    />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.productInfoContainer}>
          <h1 className={cx("text-3xl font-bold", styles.title)}>
            {product?.title}
          </h1>
          <div>
            <div className={styles.starsContainer}>
              <p> {product?.rating}</p> {stars}
            </div>
            <div className={styles.price}>S${product?.price}</div>

            {hasProdInCart ? (
              <UpdateProductQty
                product={{ ...product, quantity: quantity || 0 }}
              />
            ) : (
              <button
                type="button"
                className={styles.button}
                onClick={() =>
                  addProduct({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1,
                  })
                }
              >
                + Add to Cart
              </button>
            )}
          </div>
          <div className={styles.productDescription}>
            <p className={styles.subtitle}>Product Description</p>
            <p className="ext-sm text-gray-500">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
