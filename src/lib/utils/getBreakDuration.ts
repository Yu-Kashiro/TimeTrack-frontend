type getBreakDurationProps = {
  isPaidHoliday: boolean;
  breakDurationHours: string;
  breakDurationMinutes: string;
};

export const getBreakDuration = ({
  isPaidHoliday,
  breakDurationHours,
  breakDurationMinutes,
}: getBreakDurationProps) => {
  if (isPaidHoliday) return null;
  const hours = breakDurationHours || "00";
  const minutes = breakDurationMinutes || "00";
  return `${hours}:${minutes}`;
};
