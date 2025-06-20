import { getUser } from "@/lib/api/auth";
import { getWorkTimes, updateWorkTime } from "@/lib/api/workTime";
import { Layout } from "@/lib/utils/Layout";
import { MainButton } from "@/lib/utils/MainButton";
import type { RegistrationFormProps } from "@/types/registration_form";
import { Box, Field, Flex, Input, Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateWorkTimes = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const [workDate, setWorkDate] = useState("");
  const [clockIn, setClockIn] = useState("08:30");
  const [clockOut, setClockOut] = useState("17:15");
  const [breakDurationMinute, setBreakDurationMinute] = useState("01:00");
  const [note, setNote] = useState("");
  const [isPaidHoliday, setIsPaidHoliday] = useState(false);
  const navigate = useNavigate();
  const { workTimesId } = useParams();

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
    const fetchWorkTimes = async () => {
      try {
        const fetchWorkTimes = await getWorkTimes(workTimesId);
        if (fetchWorkTimes && fetchWorkTimes.data) {
          console.log("fetchWorkTimes.dataの結果:", fetchWorkTimes.data);
          setWorkDate(fetchWorkTimes.data.workDate);
          // setNote(fetchWorkTimes.data.note);
          // setIsPaidHoliday(fetchWorkTimes.data.isPaidHoliday);
          // setClockIn(fetchWorkTimes.data.clockIn);
          // setClockOut(fetchWorkTimes.data.clockOut);
          // setBreakDurationMinute(fetchWorkTimes.data.breakDurationMinute);
          // if (fetchWorkTimes.data.isPaidHoliday === true) {
          //   setClockIn("");
          //   setClockOut("");
          //   setBreakDurationMinute("");
          // }
        }
      } catch (e) {
        console.error("エラーが発生しました:", e);
      }
    };
    fetchWorkTimes();
  }, [workTimesId]);

  const updateWorkTimeEvent = async ({
    workDate,
    clockIn,
    clockOut,
    breakDurationMinute,
    note,
    isPaidHoliday,
  }: RegistrationFormProps) => {
    try {
      console.log(clockIn);
      console.log(clockOut);
      console.log(breakDurationMinute);
      const newWorkTime = await updateWorkTime(workTimesId, {
        work_time: {
          work_date: workDate,
          clock_in: isPaidHoliday ? null : clockIn,
          clock_out: isPaidHoliday ? null : clockOut,
          break_duration_minute: isPaidHoliday ? null : breakDurationMinute,
          note: note,
          is_paid_holiday: isPaidHoliday,
        },
      });
      console.log("修正後のworktimesデータは次の通り:", newWorkTime);
      navigate(`/work_times/${workTimesId}`);
    } catch (e) {
      console.error("エラーが発生しました。", e);
    }
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
            <Box>{workDate}</Box>
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
            <Input
              type="time"
              value={breakDurationMinute}
              step="60"
              onChange={(e) => setBreakDurationMinute(e.target.value)}
              disabled={isPaidHoliday}
            />
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
              setBreakDurationMinute("");
            } else {
              setClockIn("08:30");
              setClockOut("17:15");
              setBreakDurationMinute("01:00");
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
            breakDurationMinute,
            note,
            isPaidHoliday,
          });
          navigate(`/work_times/registration/${workTimesId}`);
        }}
      >
        修正する
      </MainButton>

      <Box>{workDate}</Box>
      <Box>{clockIn}</Box>
      <Box>{clockOut}</Box>
      <Box>{breakDurationMinute}</Box>
      <Box>{note}</Box>
      <Box>{isPaidHoliday}</Box>

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
