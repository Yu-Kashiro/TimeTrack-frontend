import { Box } from "@chakra-ui/react/box";
import { Table } from "@chakra-ui/react/table";
import { BsZoomIn } from "react-icons/bs";
import { Link } from "react-router-dom";

type WorkTimeRowProps = {
  id: number;
  workDate: string;
  workHoursAndMinute: string;
};

export const WorkTimesRow = ({
  id,
  workDate,
  workHoursAndMinute,
}: WorkTimeRowProps) => {
  return (
    <Table.Row>
      <Table.Cell textAlign="center">{workDate}</Table.Cell>
      <Table.Cell textAlign="center">{workHoursAndMinute}</Table.Cell>
      <Table.Cell>
        <Box display="flex" justifyContent="center">
          <Link to={`/work_times/${id}`}>
            <BsZoomIn />
          </Link>
        </Box>
      </Table.Cell>
    </Table.Row>
  );
};

export const EmptyWorkTimesRow = () => {
  return(
  <Table.Row>
    <Table.Cell colSpan={3} textAlign="center" p="8">
      選択した年月の勤務実績はありません
    </Table.Cell>
  </Table.Row>
  );
};
