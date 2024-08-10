import { useEffect, useState } from "react";
import styles from "./energy-counter.module.scss";
import useWebSocket from "react-use-websocket";

interface IEnergyCounter {
  defaultEnergy: number;
  socketURL: string;
  handleClick?: () => void;
}

const EnergyCounter = (props: IEnergyCounter) => {
  //@ts-ignore
  const { defaultEnergy, socketURL, handleClick } = props
  //@ts-ignore
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL);

  const energyPercent = Math.round((defaultEnergy / 4500) * 100);
  useEffect(() => {
    if (readyState !== 1) return
    sendMessage(JSON.stringify({ energy: defaultEnergy - 1 }))
  }, [defaultEnergy])

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = urlParams.get('tgWebAppData');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const userId = parsedData.user?.id;
        setUserId(userId);
      } catch (error) {
        console.error('Ошибка при парсинге данных пользователя:', error);
      }
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <p className={styles.text}>Your Energy: {energyPercent}% id {window.location.search}</p>
      <div className={styles.container}>
        <p className={styles.text}>{defaultEnergy}</p>
        <div
          className={styles.energy_band}
          style={{
            width: `${energyPercent}%`,
          }}
        />
      </div>
    </div>
  );
};

export default EnergyCounter;