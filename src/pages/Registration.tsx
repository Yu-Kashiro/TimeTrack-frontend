import { getUser } from "@/lib/api/auth";
import { createWorkTime } from "@/lib/api/workTime";
import { Layout } from "@/lib/utils/Layout";
import { MainButton } from "@/lib/utils/MainButton";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const today = new Date();
  const jstDate = new Date(today.getTime() + 9 * 60 * 60 * 1000);
  const todayDate = jstDate.toISOString().split("T")[0];
  const [workDate, setWorkDate] = useState(todayDate);
  const [clockIn, setClockIn] = useState("08:30");
  const [clockOut, setClockOut] = useState("17:15");
  // const [breakDuration, setBreakDuration] = useState("01:00");
  const [breakDurationHours, setBreakDurationHours] = useState("01");
  const [breakDurationMinutes, setBreakDurationMinutes] = useState("00");
  const [note, setNote] = useState("");
  const [isPaidHoliday, setIsPaidHoliday] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const getBreakDuration = () => {
  // 有給の場合はnull、それ以外は "hh:mm" 形式で返す
  if (isPaidHoliday) return null;
  // どちらかが空の場合は "00:00" 扱い
  const hours = breakDurationHours || "00";
  const minutes = breakDurationMinutes || "00";
  return `${hours}:${minutes}`;
};

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

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const checkLoginStatus = await getUser();
        console.log("ログインチェック結果:", checkLoginStatus);
        if (
          !checkLoginStatus ||
          !checkLoginStatus.data ||
          checkLoginStatus.data.isLogin === false
        ) {
          navigate("/signin");
          return;
        }
        setIsCheckingLogin(false);
      } catch (e) {
        console.error("エラーが発生しました:", e);
      }
    };
    checkLoginStatus();
  }, [navigate]);

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
            workDate,
            clockIn,
            clockOut,
            breakDuration: getBreakDuration(),
            note,
            isPaidHoliday,
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
