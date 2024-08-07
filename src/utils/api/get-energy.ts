export const getEnegry = async (id: number) => {
  const response = await fetch(`http://178.250.157.233:8002/test/user_entry_check/${id}`);
  const data = await response.json();
  return data;
};