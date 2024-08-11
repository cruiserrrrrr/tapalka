import styles from "./coins-counter.module.scss";
import coinImage from "../../assets/images/coin.png";
import splashImage from "../../assets/images/total-coins-splash.png";
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

interface ICoinsCounter {
  defaultCoins: number;
  socketURL: string;
}

const CoinsCounter = (props: ICoinsCounter) => {
  const { defaultCoins, socketURL } = props;
  //@ts-ignore
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL);
  
  const coinsRef = useRef(defaultCoins); 
  coinsRef.current = defaultCoins;

  useEffect(() => {
    if (readyState !== 1) return;
    const interval = setInterval(() => {
      sendMessage(JSON.stringify({ coins: coinsRef.current }));
    }, 5000);

    return () => clearInterval(interval);
  }, [readyState]);
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <img
          src={coinImage}
          alt="coin"
          className={styles.coin}
        />
        <p className={styles.coins}>{defaultCoins}</p>
        <img
          src={splashImage}
          alt="splash"
          className={styles.splash}
        />
      </div>
    </div>
  );
};

export default CoinsCounter;