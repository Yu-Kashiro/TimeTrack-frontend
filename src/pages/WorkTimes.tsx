import { getWorkTimesAll } from "@/lib/api/workTimes";
import {
  createListCollection,
  Portal,
  Select,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "@/lib/components/Layout";
import { EmptyWorkTimesRow, WorkTimesRow } from "@/lib/components/WorkTimesRow";
import { MainButton } from "@/lib/components/MainButton";
import { minutesToHoursAndMinutes } from "@/lib/utils/minutesToHoursAndMinutes";
import { toJapaneseMonthDay } from "@/lib/utils/toJapaneseMonthDay";
import { useLoginCheck } from "@/lib/hooks/useLoginCheck";
import type { WorkTimesItem } from "@/types/workTimesItem";
import { LoadingSpinner } from "@/lib/components/LoadingSpinner";
import { useLogout } from "@/lib/hooks/useLogout";
import { WorkTimesFooter } from "@/lib/components/WorkTimesFooter";
import { WorkTimesHeader } from "@/lib/components/WorkTimesHeader";

export const WorkTimes = () => {
  const navigate = useNavigate();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [workTimesItems, setWorkTimesItems] = useState<WorkTimesItem[]>([]);
  const { isLoading, setIsLoading, handleLogout } = useLogout();

  useLoginCheck({
    redirectIf: "notLoggedIn",
    redirectTo: "/signin",
    onSuccess: () => setIsCheckingLogin(false),
  });

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        const fetchWorkTimesAll = await getWorkTimesAll();
        if (fetchWorkTimesAll && fetchWorkTimesAll.data) {
          setWorkTimesItems(fetchWorkTimesAll.data);
        }
      } catch (e) {
        console.error("勤務時間一覧の取得エラー:", e);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [isCheckingLogin]);

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(
      2,
      "0",
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
      date.getMonth() + 1,
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
  const totalWorkMinutes = filteredItems
    .filter((item) => !item.isPaidHoliday)
    .reduce((sum, item) => sum + item.workMinute, 0);

  if (isCheckingLogin) return null;

  if (isLoading) {
    return (
      <Layout title="勤務一覧">
        <LoadingSpinner />
      </Layout>
    );
  }

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
              <Select.ValueText placeholder="年月を選択してください" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content
                bg="white"
                borderColor="gray.200"
                boxShadow="md"
                className="chakra-theme light"
              >
                {uniqueMonthListCollection.items.map((uniqueMonth) => (
                  <Select.Item
                    item={uniqueMonth}
                    key={uniqueMonth.value}
                    bg="white"
                    color="black"
                    _hover={{ bg: "gray.50" }}
                    _selected={{ bg: "blue.50", color: "blue.600" }}
                  >
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
          <WorkTimesHeader />

          <Table.Body>
            {filteredItems.length === 0 ? (
              <EmptyWorkTimesRow />
            ) : (
              filteredItems.map((workTimeItem) => (
                <WorkTimesRow
                  key={workTimeItem.id}
                  id={workTimeItem.id}
                  workDate={toJapaneseMonthDay(workTimeItem.workDate)}
                  workHoursAndMinute={
                    workTimeItem.isPaidHoliday
                      ? "有給"
                      : minutesToHoursAndMinutes(workTimeItem.workMinute)
                  }
                />
              ))
            )}
          </Table.Body>

          {filteredItems.length > 0 && (
            <WorkTimesFooter totalWorkMinutes={totalWorkMinutes} />
          )}
        </Table.Root>

        <MainButton
          colorPalette={"blue"}
          color={"black"}
          onClick={() => navigate("/work_times/registration")}
        >
          勤務時間を登録する
        </MainButton>
      </Stack>

      <MainButton onClick={() => handleLogout()}>ログアウトする</MainButton>
    </Layout>
  );
};
