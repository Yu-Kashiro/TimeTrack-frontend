import { deleteWorkTimes, getWorkTimes } from "@/lib/api/workTimes";
import { Layout } from "@/lib/components/Layout";
import { MainButton } from "@/lib/components/MainButton";
import { Box, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteButton } from "@/lib/components/DeleteButton";
import { minutesToHoursAndMinutes } from "@/lib/utils/minutesToHoursAndMinutes";
import type { WorkTimesItem } from "@/types/workTimesItem";
import { useLoginCheck } from "@/lib/hooks/useLoginCheck";
import { toJapaneseYearMonthDay } from "@/lib/utils/toJapaneseYearMonthDay";
import { toJapaneseHourMinutes } from "@/lib/utils/toJapaneseHourMinutes";

export const WorkTimeDetail = () => {
  const navigate = useNavigate();
  const { workTimeId } = useParams();
  const [workTimesItem, setWorkTimesItem] = useState<WorkTimesItem>();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useLoginCheck({
    redirectIf: "notLoggedIn",
    redirectTo: "/signin",
    onSuccess: () => setIsCheckingLogin(false),
  });

  const destroyWorkTime = async () => {
    setIsLoading(true);
    try {
      if (!workTimeId) return;
      await deleteWorkTimes(workTimeId);
      navigate("/work_times");
    } catch (e) {
      setIsLoading(false);
      console.error("削除エラー:", e);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!workTimeId) return;
        const fetchWorkTimes = await getWorkTimes(workTimeId);
        if (fetchWorkTimes && fetchWorkTimes.data) {
          setWorkTimesItem(fetchWorkTimes.data);
        }
      } catch (e) {
        console.error("勤務時間データの取得エラー:", e);
      }
    };
    initialize();
  }, [workTimeId]);

  if (isCheckingLogin || !workTimesItem) return null;

  return (
    <Layout title="出勤詳細">
      <Table.Root size="md">
        <Table.Body>
          <Table.Row>
            <Table.Cell>日付</Table.Cell>
            <Table.Cell>
              {toJapaneseYearMonthDay(workTimesItem.workDate)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>始業時間</Table.Cell>
            <Table.Cell>
              {workTimesItem.clockIn
                ? toJapaneseHourMinutes(workTimesItem.clockIn)
                : ""}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>終業時間</Table.Cell>
            <Table.Cell>
              {workTimesItem.clockOut
                ? toJapaneseHourMinutes(workTimesItem.clockOut)
                : ""}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>勤務時間</Table.Cell>
            <Table.Cell>
              {minutesToHoursAndMinutes(workTimesItem.workMinute)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>休憩時間</Table.Cell>
            <Table.Cell>
              {minutesToHoursAndMinutes(workTimesItem.breakDurationMinute)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>備考</Table.Cell>
            <Table.Cell>{workTimesItem.note}</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>有給休暇</Table.Cell>
            <Table.Cell>{workTimesItem.isPaidHoliday ? "有給" : ""}</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>承認有無</Table.Cell>
            <Table.Cell>
              {workTimesItem.approved ? "承認済み" : "未承認"}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      <MainButton
        colorPalette={"blue"}
        color={"black"}
        onClick={() => navigate(`/work_times/registration/${workTimesItem.id}`)}
      >
        修正する
      </MainButton>

      {isLoading ? (
        <Box textAlign="center">
          <Spinner size="sm" />
        </Box>
      ) : (
        <DeleteButton onClick={() => destroyWorkTime()} />
      )}

      <Box textAlign="center">
        <Link to="/work_times">勤務一覧に戻る</Link>
      </Box>
    </Layout>
  );
};
