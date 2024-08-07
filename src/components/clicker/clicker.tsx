import styles from "./clicker.module.scss";
import clickerImage from "../../assets/blackberry.png";

interface IClicker {
  click: () => void;
}

const Clicker = (props: IClicker) => {
  const { click } = props;
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.image_wrap} onClick={click}>
          <img
            src={clickerImage}
            alt="clicker"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Clicker;