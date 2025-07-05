export type WorkTimesItem = {
  id: number;
  workDate: string;
  clockIn: string;
  clockOut: string;
  workMinute: number;
  breakDurationMinute: number;
  note: string;
  approved: boolean;
  isPaidHoliday: boolean;
};