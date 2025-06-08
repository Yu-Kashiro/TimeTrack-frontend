"use client";

import {
  ActionBar,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Kbd,
  Portal,
  Table,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsZoomIn } from "react-icons/bs";
import { Link } from "react-router-dom";

export const WorkTimes = () => {
  const [selection, setSelection] = useState<string[]>([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const rows = items.map((item) => (
    <Table.Row
      key={item.date}
      data-selected={selection.includes(item.date) ? "" : undefined}
    >
      <Table.Cell textAlign="center">
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item.date)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.date]
                : selection.filter((date) => date !== item.date)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell textAlign="center">{item.date}</Table.Cell>
      <Table.Cell textAlign="center">{item.workMinutes}</Table.Cell>
      <Table.Cell textAlign="center">{item.breakDurationMinute}</Table.Cell>
      <Table.Cell>
        <Flex justify="center">
          <Link to="/work_times/detail">
            <BsZoomIn />
          </Link>
        </Flex>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Box w="100%">
      <Heading size="2xl" mb={5}>
        出勤一覧
      </Heading>
      <Table.Root key="outline" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox.Root
                size="sm"
                top="0.5"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? items.map((item) => item.date) : []
                  );
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">日付</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">出勤時間</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">休憩時間</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">詳細</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm">
                Delete <Kbd>⌫</Kbd>
              </Button>
              <Button variant="outline" size="sm">
                Share <Kbd>T</Kbd>
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </Box>
  );
};

const items = [
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
  {
    id: 1,
    date: "6月7日",
    workMinutes: "7時間45分",
    breakDurationMinute: "1時間",
  },
];
