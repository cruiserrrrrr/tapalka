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
    // @ts-ignore
    let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 

    if(!tg) return;
    // let usercard = document.getElementById("usercard"); 

    // profName.innerText = `${tg.initDataUnsafe.user.first_name}
    // ${tg.initDataUnsafe.user.last_name}
    // ${tg.initDataUnsafe.user.username} (${tg.initDataUnsafe.user.language_code})`;
    //выдем имя, "фамилию", через тире username и код языка

    // userid.innerText = `${tg.initDataUnsafe.user.id}`; //показываем user_id
    setUserId(tg.initDataUnsafe.user.id)
  }, []);

  return (
    <div className={styles.wrap}>
      <p className={styles.text}>Your Energy: {energyPercent}% id {userId}</p>
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