import type { Dispatch, SetStateAction } from "react";

export const useSetTime = (
  setClockIn: Dispatch<SetStateAction<string>>,
  setClockOut: Dispatch<SetStateAction<string>>,
  setBreakDurationHours: Dispatch<SetStateAction<string>>,
  setBreakDurationMinutes: Dispatch<SetStateAction<string>>
) => {
  const setClearTime = () => {
    setClockIn("");
    setClockOut("");
    setBreakDurationHours("");
    setBreakDurationMinutes("");
  };

  const setDefaultTime = () => {
    setClockIn("08:30");
    setClockOut("17:15");
    setBreakDurationHours("01");
    setBreakDurationMinutes("00");
  };

  return { setClearTime, setDefaultTime };
};
