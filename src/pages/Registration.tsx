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
  Switch,
} from "@chakra-ui/react";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { todayDateString } from "@/lib/utils/todayDateString";
import { getBreakDuration } from "@/lib/utils/getBreakDuration";

export const Registration = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const [workDate, setWorkDate] = useState(todayDateString);
  const [clockIn, setClockIn] = useState("08:30");
  const [clockOut, setClockOut] = useState("17:15");
  const [breakDurationHours, setBreakDurationHours] = useState("01");
  const [breakDurationMinutes, setBreakDurationMinutes] = useState("00");
  const [note, setNote] = useState("");
  const [isPaidHoliday, setIsPaidHoliday] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const createWorkTimeEvent = async (event: RegistrationFormProps) => {
    try {
      await createWorkTime({
        work_time: {
          work_date: event.workDate,
          clock_in: event.isPaidHoliday ? null : event.clockIn,
          clock_out: event.isPaidHoliday ? null : event.clockOut,
          break_duration: event.isPaidHoliday ? null : event.breakDuration,
          note: event.note,
          is_paid_holiday: event.isPaidHoliday,
        },
      });
      navigate("/work_times");
    } catch (e) {
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
                <option value="00">0時間</option>
                <option value="01">1時間</option>
                <option value="02">2時間</option>
                <option value="03">3時間</option>
              </NativeSelect.Field>
              <NativeSelect.Field
                value={breakDurationMinutes}
                onChange={(e) => setBreakDurationMinutes(e.target.value)}
              >
                <option value="00">0分</option>
                <option value="15">15分</option>
                <option value="30">30分</option>
                <option value="45">45分</option>
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
              setClockIn("");
              setClockOut("");
              setBreakDurationHours("");
              setBreakDurationMinutes("");
            } else {
              setClockIn("08:30");
              setClockOut("17:15");
              setBreakDurationHours("01");
              setBreakDurationMinutes("00");
            }
          }}
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>有給休暇を使用する</Switch.Label>
        </Switch.Root>
      </Flex>

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

      {errorMessages.length > 0 && (
        <Box color="red" textAlign={"center"}>
          {errorMessages.map((msg, idx) => (
            <Box key={idx}>{msg}</Box>
          ))}
        </Box>
      )}

      <MainButton onClick={() => navigate("/work_times")}>
        勤務状況を確認する
      </MainButton>
    </Layout>
  );
};
