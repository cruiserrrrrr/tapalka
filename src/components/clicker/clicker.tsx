import styles from "./clicker.module.scss";
import clickerImage from "../../assets/images/blackberry.png";
import { useRef, useState } from "react";
import IncrementFlash from "./Increment-flash/Increment-flash";
import { v4 as uuidv4 } from 'uuid';

interface IClicker {
  click: () => void;
}

const Clicker = (props: IClicker) => {
  // @ts-ignore
  const { click } = props;

  const [list, setList] = useState<any[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  // const handleClick = (e: React.MouseEvent | React.TouchEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const container = wrapRef.current;
  //   if (!container) return;

  //   const rect = container.getBoundingClientRect();
  //   const centerX = rect.left + rect.width / 2;
  //   const centerY = rect.top + rect.height / 2;

  //   let clientX: number, clientY: number;


  //   if ('touches' in e) {
  //     clientX = e.touches[0].clientX;
  //     clientY = e.touches[0].clientY;
  //   } else {
  //     clientX = e.clientX;
  //     clientY = e.clientY;
  //   }

  //   const deltaX = clientX - centerX;
  //   const deltaY = clientY - centerY;
  //   const maxTilt = 15; // Максимальный угол наклона
  //   const tiltX = (deltaY / rect.height) * maxTilt;
  //   const tiltY = -(deltaX / rect.width) * maxTilt;

  //   container.style.transform = perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg);

  //   setTimeout(() => {
  //     container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  //   }, 111);
  //   // click();
  // };
  const handleClick = (e: React.MouseEvent | React.TouchEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    }, 111)

    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    const clickCoordinates = { x: relativeX, y: relativeY };
    setList(prevList => [...prevList, clickCoordinates]);

    setTimeout(() => {
      setList(prevList => prevList.filter(item => item !== clickCoordinates));
    }, 1000)
    // click();
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    // Перебираем все точки касания
    for (let i = 0; i < event.touches.length; i++) {
      // Вызываем вашу функцию с нужными параметрами
      handleClick(event);
    }
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      {list.map((item) => (
        <IncrementFlash x={item.x} y={item.y} key={uuidv4()} />
      ))}
      <div className={styles.container}>
        <div
          className={styles.image_wrap}
          onTouchStart={handleTouchStart}
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