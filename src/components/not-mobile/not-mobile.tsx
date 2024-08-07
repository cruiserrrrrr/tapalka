import styles from "./not-mobile.module.scss";

const NotMobile = () => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Зайдите с мобильного устройства</h1>
    </div>
  );
};

export default NotMobile;