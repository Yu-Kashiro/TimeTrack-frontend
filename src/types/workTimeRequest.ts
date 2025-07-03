export type WorkTimeRequest = {
  work_time: {
    work_date: string;
    clock_in: string | null;
    clock_out: string | null;
    break_duration: string | null;
    note: string;
    is_paid_holiday: boolean;
  };
};