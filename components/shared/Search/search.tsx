import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Item from "@/components/shared/Item";
import { ProductResult, Data } from "@/interfaces/interfaces";
import ReactPaginate from "react-paginate";

import styles from "./index.module.css";

export default function Search({ data }: { data: Data }) {
  if (!data.productResult) return null;
  const [result, setResult] = useState<ProductResult>(data?.productResult);
  const [categories, setCategories] = useState<string[]>(data.categories);
  const router = useRouter();
  const limit = 20;
  const [pageCount, setPageCount] = useState<number>(
    Math.ceil(data?.productResult.total / limit)
  );
  useEffect(() => {
    setResult(data?.productResult);
    setCategories(data?.categories);
    setPageCount(Math.ceil(data?.productResult.total / limit));
  }, [data]);

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value) {
      router.push(`/search/category/${e.target.value}`);
    } else {
      router.push(`/search/all-products/1`);
    }
  };
  const paginationHandler = (page: any): void => {
    if (!page) return;

    const updateCurrentPage = page?.selected + 1;
    router.push(`/search/all-products/${updateCurrentPage}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.filter}>
          <label>Filter by: </label>
          <select
            className={styles.input}
            onChange={(e) => {
              handleCategoryChange(e);
            }}
            value={data?.category}
          >
            <option value=""> All Products </option>
            {categories &&
              categories?.length > 0 &&
              categories?.map((category, ind) => {
                return (
                  <option key={ind} value={`${category}`}>
                    {category}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      {result?.products && result?.products?.length > 0 && (
        <div className={styles.grid}>
          {result?.products?.map((product, index) => (
            <div key={product?.id}>
              <Item product={product} index={index + 1} />
            </div>
          ))}
        </div>
      )}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          activeClassName="isActive"
          containerClassName={styles.PaginationList}
          initialPage={data?.page - 1}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(page) => paginationHandler(page)}
        />
      )}
    </div>
  );
}
