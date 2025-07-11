import { getWorkTimesAll } from "@/lib/api/workTimes";
import { createListCollection, Table } from "@chakra-ui/react";
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
import { getCurrentYearMonth } from "@/lib/utils/getCurrentYearMonth";
import { SelectBox } from "@/lib/components/SelectBox";

export const WorkTimes = () => {
  const navigate = useNavigate();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [workTimesItems, setWorkTimesItems] = useState<WorkTimesItem[]>([]);
  const { isLoading, setIsLoading, handleLogout } = useLogout();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentYearMonth);

  useLoginCheck({
    redirectIf: "notLoggedIn",
    redirectTo: "/signin",
    onSuccess: () => setIsCheckingLogin(false),
  });

  useEffect(() => {
    const fetchWorkTimes = async () => {
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
    fetchWorkTimes();
  }, [setIsLoading]);

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

  // 勤務月の選択肢リストを作成
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
      <SelectBox
        uniqueMonthListCollection={uniqueMonthListCollection}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

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

      <MainButton onClick={() => handleLogout()}>ログアウトする</MainButton>
    </Layout>
  );
};
