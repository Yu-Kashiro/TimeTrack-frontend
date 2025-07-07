export const toJapaneseHourMinutes = (isoString: string) => {
  const date = new Date(isoString);
  const timeString = date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  });

  // 時間部分の先頭の0を削除
  const [hour, minute] = timeString.split(":");
  const formattedHour = hour.startsWith("0") ? hour.slice(1) : hour;

  return `${formattedHour}時${minute}分`;
};
