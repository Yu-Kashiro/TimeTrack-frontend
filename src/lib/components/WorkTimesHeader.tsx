import { Table } from "@chakra-ui/react/table";

export const WorkTimesHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader textAlign="center">日付</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="center">勤務時間</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="center">詳細</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  );
};
