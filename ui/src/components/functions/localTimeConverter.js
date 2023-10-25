export const localTime = (data) => {
  const utcTimestamp = data;
  const date = new Date(utcTimestamp);
  const timeZone = "Asia/Kolkata";
  const options = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const localDateTime = date.toLocaleString("en-IN", options);

  return localDateTime;
};
