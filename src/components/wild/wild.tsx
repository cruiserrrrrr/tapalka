import { useEffect, useState } from "react";
import Clicker from "../clicker/clicker";
import CoinsCounter from "../coins-counter/coins-counter";
import EnergyCounter from "../energy-counter/energy-counter";
import styles from "./wild.module.scss";
import { getCoins } from "../../utils/api/get-coins";
import Shadows from "../shadows/shadows";
import { initInitData } from '@telegram-apps/sdk';

const Wild = () => {

  const [coins, setConins] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initData = initInitData();
  const userID = initData?.user?.id
  // const userID = 123
  const backURLEnergy = `${import.meta.env.VITE_BACKEND_WS_URL}/energy_gain/${userID}/`;
  const backURLCoins = `${import.meta.env.VITE_BACKEND_WS_URL}/coins_gain/${userID}/`;


  useEffect(() => {
    if (typeof energy !== 'number' || typeof coins !== 'number') return
    if (!isLoading) return;
    if (!userID) return
    getCoins(userID).then((data) => {
      setConins(data.coins);
      setEnergy(data.energy);
      setIsLoading(false);
    })
  }, [isLoading])

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
      <Shadows />
    </div>
  );
}

export default Wild;