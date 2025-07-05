export const todayDateString = () => {
  const utcToday = new Date();
  const jstToday = new Date(utcToday.getTime() + 9 * 60 * 60 * 1000);
  const todayDate = jstToday.toISOString().split("T")[0];
  return todayDate;
};
