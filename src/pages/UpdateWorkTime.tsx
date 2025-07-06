import { getWorkTimes, updateWorkTime } from "@/lib/api/workTimes";
import { Layout } from "@/lib/components/Layout";
import { MainButton } from "@/lib/components/MainButton";
import { useLoginCheck } from "@/lib/hooks/useLoginCheck";
import { getBreakDuration } from "@/lib/utils/getBreakDuration";
import { isoStringToHourAndMinutes } from "@/lib/utils/isoStringToHourAndMinutes";
import { minutesToHourPartAndMinutesPart } from "@/lib/utils/minutesToHourPartAndMinutesPart";
import { toJapaneseYearMonthDay } from "@/lib/utils/toJapaneseYearMonthDay";
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
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [breakDurationHours, setBreakDurationHours] = useState("");
  const [breakDurationMinutes, setBreakDurationMinutes] = useState("");
  const [note, setNote] = useState("");
  const [isPaidHoliday, setIsPaidHoliday] = useState(false);

  const [beforeUpdateWorkTime, setBeforeUpdateWorkTime] = useState<{
    clockIn: string;
    clockOut: string;
    breakDurationHours: string;
    breakDurationMinutes: string;
    isPaidHoliday: boolean;
  } | null>(null);

  const navigate = useNavigate();
  const { workTimeId } = useParams();

  useEffect(() => {
    const fetchBeforeUpdateWorkTime = async () => {
      try {
        if (!workTimeId) return;

        const response = await getWorkTimes(workTimeId);
        if (response && response.data) {
          const data = response.data;

          // 基本情報の設定
          setWorkDate(data.workDate);
          setNote(data.note || "");
          setIsPaidHoliday(data.isPaidHoliday || false);

          if (data.isPaidHoliday) {
            // 有給休暇の場合は空にする
            setClockIn("");
            setClockOut("");
            setBreakDurationHours("");
            setBreakDurationMinutes("");
            // 有給休暇でも元の値は保存しておく（復元用）
            if (data.clockIn && data.clockOut) {
              const originalClockIn = isoStringToHourAndMinutes(data.clockIn);
              const originalClockOut = isoStringToHourAndMinutes(data.clockOut);
              const breakDuration = data.breakDuration || "01:00";
              const [hours, minutes] = breakDuration.split(":");
              setBeforeUpdateWorkTime({
                clockIn: originalClockIn,
                clockOut: originalClockOut,
                breakDurationHours: hours || "01",
                breakDurationMinutes: minutes || "00",
                isPaidHoliday: true,
              });
            } else {
              // 有給休暇だが元の勤務時間データがない場合、デフォルト値を設定
              setBeforeUpdateWorkTime({
                clockIn: "08:30",
                clockOut: "17:15",
                breakDurationHours: "01",
                breakDurationMinutes: "00",
                isPaidHoliday: true,
              });
            }
          } else {
            // 通常勤務の場合
            const clockInValue = isoStringToHourAndMinutes(data.clockIn);
            const clockOutValue = isoStringToHourAndMinutes(data.clockOut);
            const { hourPart, minutePart } = minutesToHourPartAndMinutesPart(
              data.breakDurationMinute
            );
            const breakHours = hourPart || "01";
            const breakMinutes = minutePart || "00";

            // 表示用の値を設定
            setClockIn(clockInValue);
            setClockOut(clockOutValue);
            setBreakDurationHours(breakHours);
            setBreakDurationMinutes(breakMinutes);

            // 復元用の値も設定
            setBeforeUpdateWorkTime({
              clockIn: clockInValue,
              clockOut: clockOutValue,
              breakDurationHours: breakHours,
              breakDurationMinutes: breakMinutes,
              isPaidHoliday: false,
            });
          }
        }
      } catch (e) {
        console.error("エラーが発生しました:", e);
      }
    };

    fetchBeforeUpdateWorkTime();
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
      if (!workTimeId) return;
      await updateWorkTime(workTimeId, {
        work_time: {
          work_date: workDate,
          clock_in: isPaidHoliday ? null : clockIn,
          clock_out: isPaidHoliday ? null : clockOut,
          break_duration: isPaidHoliday ? null : breakDuration,
          note: note,
          is_paid_holiday: isPaidHoliday,
        },
      });
      navigate(`/work_times/${workTimeId}`);
    } catch (e) {
      console.error("エラーが発生しました。", e);
    }
  };

  useLoginCheck({
    redirectIf: "notLoggedIn",
    redirectTo: "/signin",
    onSuccess: () => setIsCheckingLogin(false),
  });

  if (isCheckingLogin) return null;

  return (
    <Layout title="出勤登録(修正)">
      <Field.Root>
        <Box width="100%">
          <Flex align="center" gap={4}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">
              日付
            </Field.Label>
            <Box>{toJapaneseYearMonthDay(workDate)}</Box>
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
              // 有給休暇に切り替える場合、時間関連の入力をクリア。
              setClockIn("");
              setClockOut("");
              setBreakDurationHours("");
              setBreakDurationMinutes("");
            } else {
              // 有給休暇のチェックが外れた場合
              if (beforeUpdateWorkTime) {
                if (beforeUpdateWorkTime.isPaidHoliday) {
                  // 元データが有給休暇の場合は、デフォルト設定
                  setClockIn("08:30");
                  setClockOut("17:15");
                  setBreakDurationHours("01");
                  setBreakDurationMinutes("00");
                } else {
                  // 元データに勤務時間がある場合、元の値を復元
                  setClockIn(beforeUpdateWorkTime.clockIn);
                  setClockOut(beforeUpdateWorkTime.clockOut);
                  setBreakDurationHours(
                    beforeUpdateWorkTime.breakDurationHours
                  );
                  setBreakDurationMinutes(
                    beforeUpdateWorkTime.breakDurationMinutes
                  );
                }
              }
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
        修正する
      </MainButton>

      <MainButton onClick={() => navigate("/work_times")}>
        勤務状況一覧に戻る
      </MainButton>
    </Layout>
  );
};
