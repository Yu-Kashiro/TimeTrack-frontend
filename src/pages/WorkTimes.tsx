import { getWorkTimesAll } from "@/lib/api/workTimes";
import {
  Box,
  createListCollection,
  Portal,
  Select,
  Spinner,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "@/lib/api/auth";
import { Layout } from "@/lib/components/Layout";
import { WorkTimesRow } from "@/lib/components/WorkTimesRow";
import { MainButton } from "@/lib/components/MainButton";
import { minutesToHoursAndMinutes } from "@/lib/utils/minutesToHoursAndMinutes";
import { toJapaneseMonthDay } from "@/lib/utils/toJapaneseMonthDay";
import { useLoginCheck } from "@/lib/hooks/useLoginCheck";
import type { WorkTimesItem } from "@/types/workTimesItem";

export const WorkTimes = () => {
  const navigate = useNavigate();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [workTimesItems, setWorkTimesItems] = useState<WorkTimesItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useLoginCheck({
    redirectIf: "notLoggedIn",
    redirectTo: "/signin",
    onSuccess: () => setIsCheckingLogin(false),
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchWorkTimesAll = await getWorkTimesAll();
        if (fetchWorkTimesAll && fetchWorkTimesAll.data) {
          setWorkTimesItems(fetchWorkTimesAll.data);
        }
      } catch (e) {
        console.error("エラーが発生しました:", e);
      }
    };
    initialize();
  }, [isCheckingLogin]);

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}月`;
  });

  const filteredItems = workTimesItems.filter((item) => {
    const selectedMonthDash = selectedMonth
      .replace("年", "-")
      .replace("月", "");
    return item.workDate.startsWith(selectedMonthDash);
  });

  // 勤務一覧から、一意の年月を抽出
  const yearAndMonthsSet = new Set<string>();
  workTimesItems.forEach((item) => {
    const date = new Date(item.workDate);
    const yearAndMonthStr = `${date.getFullYear()}年${String(
      date.getMonth() + 1
    ).padStart(2, "0")}月`;
    yearAndMonthsSet.add(yearAndMonthStr);
  });

  // ChakraUIテーブル用のCollectionフォーマットを作成
  const uniqueMonthListCollection = createListCollection({
    items: Array.from(yearAndMonthsSet)
      .sort()
      .map((month) => ({
        label: month,
        value: month,
      })),
  });

  // 勤務時間の合計を算出
  const totalWorkMinutes = () => {
    return filteredItems
      .filter((item) => !item.isPaidHoliday)
      .reduce((sum, item) => sum + item.workMinute, 0);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      navigate("/signin");
    } catch (e) {
      setIsLoading(false);
      console.log("ログアウト失敗", e);
    }
  };

  if (isCheckingLogin) return null;

  return (
    <Layout title="勤務一覧">
      <Stack gap="4">
        <Select.Root
          collection={uniqueMonthListCollection}
          value={[selectedMonth]}
          onValueChange={(e) => setSelectedMonth(e.value[0])}
          size="md"
          defaultValue={[selectedMonth]} //初期値は現在の年月
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {uniqueMonthListCollection.items.map((uniqueMonth) => (
                  <Select.Item item={uniqueMonth} key={uniqueMonth.value}>
                    {uniqueMonth.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        {/* テーブル */}
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign="center">日付</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                勤務時間
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">詳細</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredItems.map((workTimesItem) => (
              <WorkTimesRow
                key={workTimesItem.id}
                id={workTimesItem.id}
                workDate={toJapaneseMonthDay(workTimesItem.workDate)}
                workHoursAndMinute={
                  workTimesItem.isPaidHoliday
                    ? "有給"
                    : minutesToHoursAndMinutes(workTimesItem.workMinute)
                }
              />
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.Cell textAlign="center">合計</Table.Cell>
              <Table.Cell textAlign="center">
                {minutesToHoursAndMinutes(totalWorkMinutes())}
              </Table.Cell>
              <Table.Cell textAlign="center">ー</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>

        <MainButton
          colorPalette={"blue"}
          color={"black"}
          onClick={() => navigate("/work_times/registration")}
        >
          勤務時間を登録する
        </MainButton>
      </Stack>

      {isLoading ? (
        <Box textAlign="center">
          <Spinner size="sm" />
        </Box>
      ) : (
        <MainButton onClick={() => handleLogout()}>ログアウトする</MainButton>
      )}
    </Layout>
  );
};
