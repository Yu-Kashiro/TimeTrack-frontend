import { Table } from "@chakra-ui/react/table";
import { minutesToHoursAndMinutes } from "../utils/minutesToHoursAndMinutes";

type totalWorkMinutesProps = {
  totalWorkMinutes: number;
};

export const WorkTimesFooter = ({ totalWorkMinutes }: totalWorkMinutesProps) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.Cell textAlign="center">合計</Table.Cell>
        <Table.Cell textAlign="center">
          {minutesToHoursAndMinutes(totalWorkMinutes)}
        </Table.Cell>
        <Table.Cell textAlign="center">ー</Table.Cell>
      </Table.Row>
    </Table.Footer>
  );
};
