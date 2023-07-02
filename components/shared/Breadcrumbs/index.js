import Link from "next/link";

import styles from "./index.module.css";

export default function Breadcrumbs({ links }) {
  return (
    <div className={styles.container}>
      {links?.map((link, index) => (
        <Link className={styles.link} href={link.url} key={index}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
