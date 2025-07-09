import { createWorkTime } from "@/lib/api/workTimes";
import { useLoginCheck } from "@/lib/hooks/useLoginCheck";
import { Layout } from "@/lib/components/Layout";
import { MainButton } from "@/lib/components/MainButton";
import type { RegistrationFormProps } from "@/types/registration-form";
import {
  Box,
  Field,
  Flex,
  Input,
  NativeSelect,
  Spinner,
  Switch,
} from "@chakra-ui/react";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { todayDateString } from "@/lib/utils/todayDateString";
import { getBreakDuration } from "@/lib/utils/getBreakDuration";
import { validateWorkTime } from "@/lib/utils/validateWorkTime";
import { setTime } from "@/lib/utils/setTime";
import { BreakHourOptions } from "@/lib/components/BreakHourOptions";
import { BreakMinuteOptions } from "@/lib/components/BreakMinuteOptions";

export const Registration = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [workDate, setWorkDate] = useState(todayDateString);
  const [clockIn, setClockIn] = useState("08:30");
  const [clockOut, setClockOut] = useState("17:15");
  const [breakDurationHours, setBreakDurationHours] = useState("01");
  const [breakDurationMinutes, setBreakDurationMinutes] = useState("00");
  const [note, setNote] = useState("");
  const [isPaidHoliday, setIsPaidHoliday] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const { setClearTime, setDefaultTime } = setTime(
    setClockIn,
    setClockOut,
    setBreakDurationHours,
    setBreakDurationMinutes,
  );

  const createWorkTimeEvent = async ({
    workDate,
    clockIn,
    clockOut,
    breakDuration,
    note,
    isPaidHoliday,
  }: RegistrationFormProps) => {
    const validationResult = validateWorkTime({
      clockIn: clockIn,
      clockOut: clockOut,
      breakDurationHours,
      breakDurationMinutes,
      isPaidHoliday: isPaidHoliday,
    });

    if (!validationResult.isValid) {
      setErrorMessages(validationResult.errors);
      return;
    }

    setErrorMessages([]);
    setIsLoading(true);

    try {
      await createWorkTime({
        work_time: {
          work_date: workDate,
          clock_in: isPaidHoliday ? null : clockIn,
          clock_out: isPaidHoliday ? null : clockOut,
          break_duration: isPaidHoliday ? null : breakDuration,
          note: note,
          is_paid_holiday: isPaidHoliday,
        },
      });
      navigate("/work_times");
    } catch (e) {
      setIsLoading(false);
      const err = e as AxiosError;
      if (
        err.response?.data &&
        typeof err.response.data === "object" &&
        "errors" in err.response.data
      ) {
        setErrorMessages((err.response.data as { errors: string[] }).errors);
      } else {
        setErrorMessages(["予期しないエラーが発生しました。"]);
      }
    }
  };

  useLoginCheck({
    redirectIf: "notLoggedIn",
    redirectTo: "/signin",
    onSuccess: () => setIsCheckingLogin(false),
  });

  if (isCheckingLogin) return null;

  return (
    <Layout title="出勤登録">
      <Field.Root>
        <Box width="100%">
          <Flex align="center" gap={4}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">
              日付
            </Field.Label>
            <Input
              type="date"
              value={workDate}
              width="100%"
              onChange={(e) => setWorkDate(e.target.value)}
            />
          </Flex>
        </Box>

        <Box width="100%">
          <Flex align="center" gap={4} mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">
              始業時間
            </Field.Label>
            <Input
              type="time"
              value={clockIn}
              onChange={(e) => setClockIn(e.target.value)}
              disabled={isPaidHoliday}
            />
          </Flex>
        </Box>

        <Box width="100%">
          <Flex align="center" gap={4} mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">
              終業時間
            </Field.Label>
            <Input
              type="time"
              value={clockOut}
              onChange={(e) => setClockOut(e.target.value)}
              disabled={isPaidHoliday}
            />
          </Flex>
        </Box>

        {/* isPaidHoliday=trueの場合のdisabledが効かない。field外に持っていくと、有効化する。要調査。 */}
        <Box width="100%">
          <Flex align="center" gap={4} mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">
              休憩時間
            </Field.Label>
            <NativeSelect.Root disabled={isPaidHoliday}>
              <NativeSelect.Field
                value={breakDurationHours}
                onChange={(e) => setBreakDurationHours(e.target.value)}
              >
                <BreakHourOptions />
              </NativeSelect.Field>
              <NativeSelect.Field
                value={breakDurationMinutes}
                onChange={(e) => setBreakDurationMinutes(e.target.value)}
              >
                <BreakMinuteOptions />
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Flex>
        </Box>

        <Box width="100%">
          <Flex align="center" gap={4} mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">
              備考
            </Field.Label>
            <Input
              type="text"
              value={note}
              autoComplete="off"
              onChange={(e) => setNote(e.target.value)}
            />
          </Flex>
        </Box>
      </Field.Root>

      <Flex justify="flex-end" mt={3}>
        <Switch.Root
          colorPalette="blue"
          checked={isPaidHoliday}
          onCheckedChange={(e) => {
            setIsPaidHoliday(e.checked);
            if (e.checked) {
              setClearTime();
            } else {
              setDefaultTime();
            }
          }}
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>有給休暇を使用する</Switch.Label>
        </Switch.Root>
      </Flex>

      {isLoading ? (
        <Box textAlign="center">
          <Spinner size="sm" />
        </Box>
      ) : (
        <MainButton
          colorPalette={"blue"}
          color={"black"}
          onClick={() => {
            createWorkTimeEvent({
              workDate: workDate,
              clockIn: clockIn,
              clockOut: clockOut,
              breakDuration: getBreakDuration({
                isPaidHoliday,
                breakDurationHours,
                breakDurationMinutes,
              }),
              note: note,
              isPaidHoliday: isPaidHoliday,
            });
          }}
        >
          登録する
        </MainButton>
      )}

      {errorMessages.length > 0 && (
        <Box color="red" textAlign={"center"}>
          {errorMessages.map((msg, index) => (
            <Box key={index}>{msg}</Box>
          ))}
        </Box>
      )}

      <MainButton onClick={() => navigate("/work_times")}>
        勤務状況を確認する
      </MainButton>
    </Layout>
  );
};
