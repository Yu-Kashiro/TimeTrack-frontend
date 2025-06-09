import { createWorkTime } from "@/lib/api/workTime";
import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const todayDate = new Date().toISOString().split("T")[0];
  const [workDate, setWorkDate] = useState(todayDate);
  const [clockIn, setClockIn] = useState("08:30");
  const [clockOut, setClockOut] = useState("17:15");
  const [breakDurationMinute, setBreakDurationMinute] = useState("01:00");
  const [note, setNote] = useState("");
  const [isPaidVacation, setIsPaidVacation] = useState(false);
  const navigate = useNavigate();

  const createWorkTimeEvent = async (event) => {
    console.log(event)
    console.log("createWorkTimeEventの実行")
    await createWorkTime({
      workDate: event.workDate,
      clockIn: event.clockIn,
      clockOut: event.clockOut,
      breakDurationMinute: event.breakDurationMinute,
      note: event.note,
    });
  };




  return (
    <Stack>
      <Heading size="2xl" mb={5}>
        出勤登録
      </Heading>
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
              disabled={isPaidVacation}
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
              disabled={isPaidVacation}
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
              disabled={isPaidVacation}
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
          checked={isPaidVacation}
          onCheckedChange={(e) => {
            setIsPaidVacation(e.checked);
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

      <Button
        colorPalette={"blue"}
        variant="subtle"
        onClick={() => {
          createWorkTimeEvent({
            workDate,
            clockIn,
            clockOut,
            breakDurationMinute,
            note,
            isPaidVacation,
          });
          navigate("/work_times/index");
        }}
        mt={5}
        color={"black"}
        size="xl"
      >
        登録する
      </Button>

      <Button variant="subtle" type="submit" mt={5} color={"black"} size="xl">
        出勤状況を確認する
      </Button>
    </Stack>
  );
};
