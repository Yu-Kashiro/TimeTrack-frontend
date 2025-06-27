import { getUser } from "@/lib/api/auth";
import { getWorkTimes, updateWorkTime } from "@/lib/api/workTime";
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateWorkTime = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const [workDate, setWorkDate] = useState("");
  const [clockIn, setClockIn] = useState("08:30");
  const [clockOut, setClockOut] = useState("17:15");
  const [breakDurationHours, setBreakDurationHours] = useState("01");
  const [breakDurationMinutes, setBreakDurationMinutes] = useState("00");
  const [note, setNote] = useState("");
  const [isPaidHoliday, setIsPaidHoliday] = useState(false);
  const navigate = useNavigate();
  const { workTimeId } = useParams();

  const getBreakDuration = () => {
    // 有給の場合はnull、それ以外は "hh:mm" 形式で返す
    if (isPaidHoliday) return null;
    // どちらかが空の場合は "00:00" 扱い
    const hours = breakDurationHours || "00";
    const minutes = breakDurationMinutes || "00";
    return `${hours}:${minutes}`;
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

  useEffect(() => {
    const extractTime = (isoString: string | null): string => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const fetchWorkTimes = async () => {
      try {
        const fetchWorkTimes = await getWorkTimes(workTimeId);
        if (fetchWorkTimes && fetchWorkTimes.data) {
          console.log("fetchWorkTimes.dataの結果:", fetchWorkTimes.data);
          setWorkDate(fetchWorkTimes.data.workDate);
          setNote(fetchWorkTimes.data.note || "");
          setIsPaidHoliday(fetchWorkTimes.data.isPaidHoliday || false);

          if (fetchWorkTimes.data.isPaidHoliday) {
            setClockIn("");
            setClockOut("");
            setBreakDurationHours("");
            setBreakDurationMinutes("");
          } else {
            setClockIn(extractTime(fetchWorkTimes.data.clockIn));
            setClockOut(extractTime(fetchWorkTimes.data.clockOut));
            const breakDuration = fetchWorkTimes.data.breakDuration || "01:00";
            const [hours, minutes] = breakDuration.split(":");
            setBreakDurationHours(hours || "01");
            setBreakDurationMinutes(minutes || "00");
          }
        }
      } catch (e) {
        console.error("エラーが発生しました:", e);
      }
    };

    fetchWorkTimes();
  }, [workTimeId]);

  const updateWorkTimeEvent = async ({
    workDate,
    clockIn,
    clockOut,
    breakDuration,
    note,
    isPaidHoliday,
  }: RegistrationFormProps) => {
    try {
      const newWorkTime = await updateWorkTime(workTimeId, {
        work_time: {
          work_date: workDate,
          clock_in: isPaidHoliday ? null : clockIn,
          clock_out: isPaidHoliday ? null : clockOut,
          break_duration: isPaidHoliday ? null : breakDuration,
          note: note,
          is_paid_holiday: isPaidHoliday,
        },
      });
      console.log("修正後のworktimesデータは次の通り:", newWorkTime);
      navigate(`/work_times/${workTimeId}`);
    } catch (e) {
      console.error("エラーが発生しました。", e);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  if (isCheckingLogin) return null;

  return (
    <Layout title="出勤登録(修正)">
      <Field.Root>
        <Box width="100%">
          <Flex align="center" gap={4}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">
              日付
            </Field.Label>
            <Box>{formatDate(workDate)}</Box>
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
          updateWorkTimeEvent({
            workDate,
            clockIn,
            clockOut,
            breakDuration: getBreakDuration(),
            note,
            isPaidHoliday,
          });
          navigate(`/work_times/registration/${workTimeId}`);
        }}
      >
        修正する
      </MainButton>
      <MainButton
        colorPalette={"gray"}
        color={"black"}
        onClick={() => navigate("/work_times")}
      >
        勤務状況一覧に戻る
      </MainButton>
    </Layout>
  );
};
