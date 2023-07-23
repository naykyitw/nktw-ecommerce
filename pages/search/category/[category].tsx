import { ProductResult, Data } from "@/interfaces/interfaces";
import Search from "../../../components/shared/Search/search";

async function getData(category?: string): Promise<ProductResult> {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  return res.json();
}

async function getCategories(): Promise<string[]> {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  return res.json();
}
export async function getStaticPaths() {
  const res = await getCategories();
  if (!res) {
    return { paths: [], fallback: "blocking" };
  }
  const paths = res?.map((category) => ({
    params: { category },
  }));
  return { paths, fallback: "blocking" };
}
export async function getStaticProps({ params }: any) {
  const { category } = params;

  const res = getData(category);
  const categories = getCategories();
  const data: Data = {
    productResult: await res,
    categories: await categories,
    category,
    page: 1,
  };
  return { props: { data } };
}

export default function Page({ data }: { data: Data }) {
  return <Search data={data} />;
}
