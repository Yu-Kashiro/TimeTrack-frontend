export const getCurrentYearMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}月`;
};