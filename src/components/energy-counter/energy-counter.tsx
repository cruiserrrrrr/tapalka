import { useEffect, useRef } from "react";
import styles from "./energy-counter.module.scss";
import useWebSocket from "react-use-websocket";

interface IEnergyCounter {
  defaultEnergy: number;
  socketURL: string;
}

const EnergyCounter = (props: IEnergyCounter) => {
  const { defaultEnergy, socketURL } = props
  const { sendMessage, readyState } = useWebSocket(socketURL);

  const energyPercent = Math.round((defaultEnergy / 4500) * 100);

  const coinsRef = useRef(defaultEnergy);
  coinsRef.current = defaultEnergy;

  useEffect(() => {
    if (readyState !== 1) return
    const interval = setInterval(() => {
      sendMessage(JSON.stringify({ energy: coinsRef.current - 1 }));
      // можно и уменьшить 
    }, 5000);
    return () => clearInterval(interval)
  }, [readyState]);

  return (
    <div className={styles.wrap}>
      <p className={styles.text}>Your Energy: {energyPercent}%</p>
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