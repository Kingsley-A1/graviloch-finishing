import Image from "next/image";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.screen}>
      <div className={styles.centerBlock}>
        <Image
          src="/icons/logo.png"
          alt="GRAVILOCH FINISHINGS LTD"
          width={92}
          height={92}
          priority
          className={styles.logo}
        />
        <div className={styles.brandWrap}>
          <h1 className={styles.brand}>GRAVILOCH</h1>
          <p className={styles.subBrand}>FINISHINGS LTD</p>
        </div>
      </div>
      <p className={styles.caption}>Italian Creative painting</p>
    </div>
  );
}