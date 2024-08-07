const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const getCoins = async (id: number) => {
  const response = await fetch(`${BACKEND_URL}/user_entry_check/${id}`);
  const data = await response.json();
  return data;
};