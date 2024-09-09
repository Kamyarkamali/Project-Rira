export const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const daysLeft = days;
  const hoursLeft = hours % 24;
  const minutesLeft = minutes % 60;
  const secondsLeft = seconds % 60;

  return `${daysLeft} روز ${hoursLeft} ساعت ${minutesLeft} دقیقه ${secondsLeft} ثانیه`;
};
