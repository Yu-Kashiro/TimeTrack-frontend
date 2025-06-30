"use client";

import { getWorkTimesAll } from "@/lib/api/workTime";
import { Stack, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { destroyUser, getUser } from "@/lib/api/auth";
import { Layout } from "@/lib/utils/Layout";
import { WorkTimesRow } from "@/lib/utils/WorkTimesRow";
import { MainButton } from "@/lib/utils/MainButton";
import formatMinutesToHoursAndMinutes from "@/lib/utils/timeFormatter";

export type WorkTimesItem = {
  id: number;
  workDate: string;
  clockIn: string;
  clockOut: string;
  workMinute: number;
  breakDurationMinute: number;
  note: string;
  approved: boolean;
  isPaidHoliday: boolean;
};

export const WorkTimes = () => {
  const navigate = useNavigate();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [workTimesItems, setWorkTimesItems] = useState<WorkTimesItem[]>([]);

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const uniqueMonths = useMemo(() => {
    const monthsSet = new Set<string>();

    workTimesItems.forEach((item) => {
      const date = new Date(item.workDate);
      const monthStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthsSet.add(monthStr);
    });

    return Array.from(monthsSet).sort();
  }, [workTimesItems]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const checkLoginStatus = await getUser();
        if (
          !checkLoginStatus ||
          !checkLoginStatus.data ||
          checkLoginStatus.data.isLogin === false
        ) {
          navigate("/signin");
          return;
        }

        const fetchWorkTimesAll = await getWorkTimesAll();
        if (fetchWorkTimesAll && fetchWorkTimesAll.data) {
          setWorkTimesItems(fetchWorkTimesAll.data);
        }
        setIsCheckingLogin(false);
      } catch (e) {
        console.error("エラーが発生しました:", e);
      }
    };

    initialize();
  }, [navigate]);

  const filteredItems = workTimesItems.filter((item) => {
    return item.workDate.startsWith(selectedMonth);
  });

  const totalWorkMinutes = useMemo(() => {
    return filteredItems
      .filter((item) => !item.isPaidHoliday)
      .reduce((sum, item) => sum + item.workMinute, 0);
  }, [filteredItems]);

  const totalBreakMinutes = useMemo(() => {
    return filteredItems
      .filter((item) => !item.isPaidHoliday)
      .reduce((sum, item) => sum + item.breakDurationMinute, 0);
  }, [filteredItems]);

  if (isCheckingLogin) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const handleLogout = async () => {
    try {
      await destroyUser();
      navigate("/signin");
    } catch (e) {
      console.log("ログアウトできません。", e);
    }
  };

  return (
    <Layout title="勤務一覧">
      <Stack gap="4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            border: "1px solid #000",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          {uniqueMonths.map((month) => {
            const [year, monthNum] = month.split("-");
            return (
              <option key={month} value={month}>
                {`${year}年${Number(monthNum)}月`}
              </option>
            );
          })}
        </select>

        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign="center">日付</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                勤務時間
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                休憩時間
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">詳細</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredItems.map((workTimesItem) => (
              <WorkTimesRow
                key={workTimesItem.id}
                id={workTimesItem.id}
                workDate={formatDate(workTimesItem.workDate)}
                workMinute={
                  workTimesItem.isPaidHoliday
                    ? "有給"
                    : formatMinutesToHoursAndMinutes(workTimesItem.workMinute)
                }
                breakDurationMinute={
                  workTimesItem.isPaidHoliday
                    ? ""
                    : formatMinutesToHoursAndMinutes(
                        workTimesItem.breakDurationMinute
                      )
                }
              />
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.Cell textAlign="center">合計</Table.Cell>
              <Table.Cell textAlign="center">
                {formatMinutesToHoursAndMinutes(totalWorkMinutes)}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {formatMinutesToHoursAndMinutes(totalBreakMinutes)}
              </Table.Cell>
              <Table.Cell textAlign="center">ー</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>

        <MainButton
          colorPalette={"blue"}
          color={"black"}
          children="勤務時間を登録する"
          onClick={() => navigate("/work_times/registration")}
        />
      </Stack>
      <MainButton
        colorPalette={"gray"}
        onClick={() => handleLogout()}
        color={"black"}
      >
        ログアウトする
      </MainButton>
    </Layout>
  );
};
