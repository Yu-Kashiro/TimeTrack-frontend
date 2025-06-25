export default function formatMinutesToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  const hourPart = hours > 0 ? `${hours}時間` : '';
  const minutePart = remaining > 0 ? `${remaining}分` : '';

  // 両方0の場合は "0分" を表示する
  return hourPart || minutePart ? `${hourPart}${minutePart}` : '0分';
}