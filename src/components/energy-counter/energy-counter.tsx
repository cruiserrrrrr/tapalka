import { useEffect } from "react";
import styles from "./energy-counter.module.scss";
import useWebSocket from "react-use-websocket";
import { initInitData } from '@telegram-apps/sdk';
// import { useSearchParams } from "react-router-dom";

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

  // const searchParams = window.location.search;
  // const a = new URLSearchParams(searchParams);
  // const b = a.get('asd')
  // console.log(b)
  // @ts-ignore

  const initData = initInitData();
  console.log(initData, 'initData')
  // const parsedinitData = JSON.parse(initData);
  // const userParsed = JSON.parse(parsedinitData.user).id;
  // const initDataRaw = new URLSearchParams([
  //   ['user', JSON.stringify({
  //     id: 99281932,
  //     first_name: 'Andrew',
  //     last_name: 'Rogue',
  //     username: 'rogue',
  //     language_code: 'en',
  //     is_premium: true,
  //     allows_write_to_pm: true,
  //   })],
  //   ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
  //   ['auth_date', '1716922846'],
  //   ['start_param', 'debug'],
  //   ['chat_type', 'sender'],
  //   ['chat_instance', '8428209589180549439'],
  // ]);
  // const user = initDataRaw.get('user');
  // //@ts-ignore
  // const id = JSON.parse(user).id;
  return (
    <div className={styles.wrap}>
      <p className={styles.text}>Your Energy: {energyPercent}% id</p>
      <p>searchParamsString 1</p>
      {/* <p>id {id}</p> */}

      {/* <p>userParsed {userParsed}</p> */}
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