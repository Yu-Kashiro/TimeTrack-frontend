type WorkTimeValidationData = {
  clockIn: string;
  clockOut: string;
  breakDurationHours: string;
  breakDurationMinutes: string;
  isPaidHoliday: boolean;
};

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const validateWorkTime = (
  data: WorkTimeValidationData
): ValidationResult => {
  const errors: string[] = [];

  // 有給休暇の場合はバリデーションスキップ
  if (data.isPaidHoliday) {
    return { isValid: true, errors: [] };
  }

  // 始業時間・終業時間が必須
  if (!data.clockIn || !data.clockOut) {
    errors.push("始業時間と終業時間は必須です。");
  }

  // 始業時間と終業時間が入力されている場合
  if (data.clockIn && data.clockOut) {
    // 終業時間が始業時間より遅いかチェック
    const [clockInHour, clockInMinute] = data.clockIn.split(":").map(Number);
    const [clockOutHour, clockOutMinute] = data.clockOut.split(":").map(Number);

    const clockInTotalMinutes = clockInHour * 60 + clockInMinute;
    const clockOutTotalMinutes = clockOutHour * 60 + clockOutMinute;

    if (clockOutTotalMinutes <= clockInTotalMinutes) {
      errors.push("終業時間は始業時間より遅い時間を設定してください。");
    }

    // 勤務時間が1分以上かチェック
    const breakHours = parseInt(data.breakDurationHours || "0", 10);
    const breakMinutes = parseInt(data.breakDurationMinutes || "0", 10);
    const totalBreakMinutes = breakHours * 60 + breakMinutes;

    const workMinutes =
      clockOutTotalMinutes - clockInTotalMinutes - totalBreakMinutes;

    if (workMinutes < 1) {
      errors.push("勤務時間が0分以下になっています。");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
