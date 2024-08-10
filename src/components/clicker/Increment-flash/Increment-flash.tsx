import styles from "./Increment-flash.module.scss";
import splashImage from "../../../assets/images/tap-splash.png";

interface IIncrementFlash {
  x: number;
  y: number;
}

const IncrementFlash = (props: IIncrementFlash) => {
  const { x, y } = props;
  return (
    <div
      className={styles.increment_flash}
      style={{
        top: y - 86,
        left: x - 71
      }}
    >
      <div className={styles.container}>
        <p className={styles.text}>+1</p>
        <img
          src={splashImage}
          alt=""
          className={styles.splash}
        />
      </div>
    </div>
  )
}

export default IncrementFlash;