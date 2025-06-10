"use client";

import { getWorkTimes } from "@/lib/api/workTime";
import { Heading, Stack, Table } from "@chakra-ui/react";
import { BsZoomIn } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type WorkTime = {
  id: number;
  workDate: string;
  workMinute: string;
  breakDurationMinute: string;
};

export const WorkTimes = () => {
  const [items, setItems] = useState<WorkTime[]>([]);

  useEffect(() => {
    const fetchWorkTimes = async () => {
      const response = await getWorkTimes();
      if (response && response.data) {
        setItems(response.data);
        console.log(response.data);
      }
    };
    fetchWorkTimes();
  }, []);

  return (
    <>
      <Heading size="2xl" mb={5}>
        出勤一覧
      </Heading>
      <Stack gap="10">
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>日付</Table.ColumnHeader>
              <Table.ColumnHeader>出勤時間</Table.ColumnHeader>
              <Table.ColumnHeader>休憩時間</Table.ColumnHeader>
              <Table.ColumnHeader>詳細</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.workDate}</Table.Cell>
                <Table.Cell>{item.workMinute}</Table.Cell>
                <Table.Cell>{item.breakDurationMinute}</Table.Cell>
                <Table.Cell>
                  <Link to="/work_times/detail">
                    <BsZoomIn />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </>
  );
};

// [
//   {
//     id: 1,
//     date: "12月31日",
//     workMinute: "7時間45分",
//     breakDurationMinute: "1時間00分",
//   },
//   {
//     id: 2,
//     date: "12月31日",
//     workMinute: "7時間45分",
//     breakDurationMinute: "1時間00分",
//   },
//   {
//     id: 3,
//     date: "12月31日",
//     workMinute: "7時間45分",
//     breakDurationMinute: "1時間00分",
//   },
//   {
//     id: 4,
//     date: "12月31日",
//     workMinute: "7時間45分",
//     breakDurationMinute: "1時間00分",
//   },
//   {
//     id: 5,
//     date: "12月31日",
//     workMinute: "7時間45分",
//     breakDurationMinute: "1時間00分",
//   },
// ];
