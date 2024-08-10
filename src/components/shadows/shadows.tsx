import styles from "./shadows.module.scss";

const Shadows = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.under_counter} />
        <div className={styles.bottom} />
        <div className={styles.left} />
      </div>
    </div>
  )
}

export default Shadows;