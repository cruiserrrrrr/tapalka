import styles from "./coins-counter.module.scss";
import coinImage from "../../assets/coin.png";
import splashImage from "../../assets/total-coins-splash.png";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

interface ICoinsCounter {
  defaultCoins: number;
  socketURL: string;
  handleClick?: () => void;
}

const CoinsCounter = (props: ICoinsCounter) => {
  const { defaultCoins, socketURL, handleClick } = props;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL);
  console.log(readyState, 'readyState coins')

  useEffect(() => {
    if (readyState !== 1) return
    sendMessage(JSON.stringify({ coins: defaultCoins + 1 }))
  }, [defaultCoins])

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