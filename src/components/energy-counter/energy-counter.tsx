import { useEffect } from "react";
import styles from "./energy-counter.module.scss";
import useWebSocket from "react-use-websocket";
// import { initInitData } from '@telegram-apps/sdk';

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
  }, [defaultEnergy]);


  // @ts-ignore
  // const [ initData ] = initInitData();

  const searchParamsString = new URLSearchParams(window.location.search).toString();

  return (
    <div className={styles.wrap}>
      <p className={styles.text}>Your Energy: {energyPercent}% id</p>
      <p>searchParamsString</p>
      <p>{searchParamsString}</p>
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