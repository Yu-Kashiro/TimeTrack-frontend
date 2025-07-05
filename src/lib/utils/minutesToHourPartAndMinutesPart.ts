export const minutesToHourPartAndMinutesPart = (minutes: number) =>  {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourPart = hours.toString().padStart(2, '0');
  const minutePart = remainingMinutes.toString().padStart(2, '0');

  return { hourPart, minutePart};
}