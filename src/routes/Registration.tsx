import { Box, Button, Field, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const Registration = () => {
  const todayDate = new Date().toISOString().split("T")[0];
  const [breakTimeMinute, setBreakTimeMinute] = useState("01:00");
  console.log(todayDate);

  return (
    <Stack>
      <Heading size="2xl" mb={5}>出勤登録</Heading>
      <Field.Root>
        <Box width="100%">
          <Flex align="center" gap={4}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">日付</Field.Label>
            <Input type="date" value={todayDate} width="100%" />
          </Flex>
        </Box>

        <Box width="100%">
          <Flex align="center" gap={4} mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">始業時間</Field.Label>
            <Input type="time" value="08:30" />
          </Flex>
        </Box>

        <Box width="100%">
          <Flex align="center" gap={4} mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">終業時間</Field.Label>
            <Input type="time" value="17:15" />
          </Flex>
        </Box>

        <Box width="100%">
          <Flex align="center" gap={4} mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">休憩時間</Field.Label>
            <Input
              type="time"
              value={breakTimeMinute}
              step="60"
              onChange={(e) => setBreakTimeMinute(e.target.value)}
            />
          </Flex>
        </Box>

        <Box width="100%">
          <Flex align="center" gap={4}  mt={3}>
            <Field.Label whiteSpace="nowrap" minWidth="80px">備考</Field.Label>
            <Input type="text" autoComplete="off" />
          </Flex>
        </Box>
      </Field.Root>
      <Button
        colorPalette={"blue"}
        variant="subtle"
        type="submit"
        mt={5}
        color={"black"}
        size="xl"
      >
        出勤時間を登録する
      </Button>

      <Button
        variant="subtle"
        type="submit"
        mt={5}
        color={"black"}
        size="xl"
      >
        出勤状況を確認する
      </Button>

    </Stack>
  );
};
