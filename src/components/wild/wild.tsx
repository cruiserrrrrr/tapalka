import { useEffect, useState } from "react";
import Clicker from "../clicker/clicker";
import CoinsCounter from "../coins-counter/coins-counter";
import EnergyCounter from "../energy-counter/energy-counter";
import styles from "./wild.module.scss";
import { getCoins } from "../../utils/api/get-coins";

const Wild = () => {

  const [coins, setConins] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //@ts-ignore
  const [userId, setUserId] = useState(null);

  const id = 761748561
  const backURLEnergy = `${import.meta.env.VITE_BACKEND_WS_URL}/energy_gain/${id}/`;
  const backURLCoins = `${import.meta.env.VITE_BACKEND_WS_URL}/coins_gain/${id}/`;
  // useEffect(() => {
  //   // Проверяем, доступен ли объект Telegram.WebApp
  //   if (window.Telegram && window.Telegram.WebApp) {
  //     const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

  //     // Проверяем, существует ли пользовательская информация
  //     if (initDataUnsafe && initDataUnsafe.user) {
  //       setUserId(initDataUnsafe.user.id);
  //     } else {
  //       console.log('Пользовательская информация недоступна.');
  //     }
  //   } else {
  //     console.log('Telegram WebApp не доступен.');
  //   }
  // }, []);

  // const handleEnergyEvents = {
  //   onOpen: (event: Event) => console.log(),
  //   onMessage: (event: Event) => { },
  //   onClose: (event: Event) => { },
  //   onError: (error: Event) => console.log(),
  // };

  // const handleCoinsEvents = {
  //   onOpen: (event: Event) => console.log(),
  //   onMessage: (event: Event) => { },
  //   onClose: (event: Event) => { },
  //   onError: (error: Event) => console.log(),
  // };

  // const sendMessage = useWebSocket(backURLEnergy, handleEnergyEvents);
  // const sendMessageCoins = useWebSocket(backURLCoins, handleCoinsEvents);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(backURLCoins);

  useEffect(() => {
    if (typeof energy !== 'number' || typeof coins !== 'number') return
    if (!isLoading) return;
    getCoins(id).then((data) => {
      setConins(data.coins);
      setEnergy(data.energy);
      setIsLoading(false);
    })
  }, [isLoading])
  // const handleClickDebounce = useDebounce(() => {
  //   // sendMessageCoins({ coins: coins + 10 });
  // }, 1000);

  // const handleTap = () => {
  //   if (energy < 1) return
  //   setEnergy(energy - 10);
  //   setConins(coins + 10);
  //   // handleClickDebounce()
  //   sendMessage(JSON.stringify({ coins: coins + 10 }))
  // }
  useEffect(() => {
    if (isLoading) return
    const intervalEnergy = setInterval(() => {
      setEnergy(prevEnergy => prevEnergy + 1 > 4500 ? 4500 : prevEnergy + 1);
    }, 1000);
    const intervalCoins = setInterval(() => {
      setConins(prevCoins => prevCoins + 1);
    }, 1000);
    return () => {
      clearInterval(intervalEnergy);
      clearInterval(intervalCoins);
    };

  }, [isLoading]);

  const handleTap = async () => {
    if (energy < 1) return
    setEnergy(energy - 1);
    setConins(coins + 1);
  }

  return (
    <div className={styles.wrap}>
      <CoinsCounter defaultCoins={coins} socketURL={backURLCoins} />
      <Clicker click={handleTap} />
      <EnergyCounter defaultEnergy={energy} socketURL={backURLEnergy} />
    </div>
  );
}

export default Wild;