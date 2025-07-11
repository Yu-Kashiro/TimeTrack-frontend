import { Table } from "@chakra-ui/react/table";
import { toJapaneseYearMonthDay } from "../utils/toJapaneseYearMonthDay";
import { toJapaneseHourMinutes } from "../utils/toJapaneseHourMinutes";
import { minutesToHoursAndMinutes } from "../utils/minutesToHoursAndMinutes";
import type { WorkTimesItem } from "@/types/workTimesItem";

export const WorkTimeDetailTable = ({
  workDate,
  clockIn,
  clockOut,
  workMinute,
  breakDurationMinute,
  note,
  isPaidHoliday,
  approved,
}: WorkTimesItem) => {
  return (
    <Table.Root size="md">
      <Table.Body>
        <Table.Row>
          <Table.Cell>日付</Table.Cell>
          <Table.Cell>{toJapaneseYearMonthDay(workDate)}</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Body>
        <Table.Row>
          <Table.Cell>始業時間</Table.Cell>
          <Table.Cell>
            {clockIn ? toJapaneseHourMinutes(clockIn) : ""}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>終業時間</Table.Cell>
          <Table.Cell>
            {clockOut ? toJapaneseHourMinutes(clockOut) : ""}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Body>
        <Table.Row>
          <Table.Cell>勤務時間</Table.Cell>
          <Table.Cell>{minutesToHoursAndMinutes(workMinute)}</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Body>
        <Table.Row>
          <Table.Cell>休憩時間</Table.Cell>
          <Table.Cell>
            {minutesToHoursAndMinutes(breakDurationMinute)}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Body>
        <Table.Row>
          <Table.Cell>備考</Table.Cell>
          <Table.Cell>{note}</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Body>
        <Table.Row>
          <Table.Cell>有給休暇</Table.Cell>
          <Table.Cell>{isPaidHoliday ? "有給" : ""}</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Body>
        <Table.Row>
          <Table.Cell>承認有無</Table.Cell>
          <Table.Cell>{approved ? "承認済み" : "未承認"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};
