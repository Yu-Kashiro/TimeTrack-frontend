export const minutesToHoursAndMinutes = (minutes: number): string =>  {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // 「◯時間◯分」で表示。0の場合は非表示にする。
  const hourPart = hours > 0 ? `${hours}時間` : '';
  const minutePart = remainingMinutes > 0 ? `${remainingMinutes}分` : '';

  // 両方0の場合は "0分" を表示
  return hourPart || minutePart ? `${hourPart}${minutePart}` : '0分';
}