export const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
export const getRandomNumberInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getRandomBool = () => {
  return Math.random() >= 0.5;
};
export const shortenAddress = (address) => {
  if (!!!address) return "";
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
export const extraShortenAddress = (address) => {
  if (!!!address) return "";
  return `${address.slice(0, 2)}..${address.slice(address.length - 2)}`;
};
export const shortenAddressLong = (address) => {
  if (!!!address) return "";
  return `${address.slice(0, 10)}...${address.slice(address.length - 9)}`;
};
export const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `hace ${seconds} segs`;
  if (minutes < 60) return `hace ${minutes} mins`;
  if (hours < 24) return `hace ${hours} hrs`;
  return `hace ${days} dias`;
};
