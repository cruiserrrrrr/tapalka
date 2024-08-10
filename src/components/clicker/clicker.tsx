import styles from "./clicker.module.scss";
import clickerImage from "../../assets/blackberry.png";
import { useRef } from "react";

interface IClicker {
  click: () => void;
}

const Clicker = (props: IClicker) => {
  // @ts-ignore
  const { click } = props;

  const wrapRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    const container = wrapRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    const maxTilt = 15; // Максимальный угол наклона
    const tiltX = (deltaY / rect.height) * maxTilt;
    const tiltY = -(deltaX / rect.width) * maxTilt;

    container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    setTimeout(() => {
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }, 111);
    // click();
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.container}>
        <div
          className={styles.image_wrap}
          onTouchStart={handleClick}
        >
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