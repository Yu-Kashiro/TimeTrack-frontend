import { getUser } from "@/lib/api/auth";
import { deleteWorkTimes, getWorkTimes } from "@/lib/api/workTime";
import { Layout } from "@/lib/utils/Layout";
import { MainButton } from "@/lib/utils/MainButton";
import { Box, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { WorkTimesItem } from "./WorkTimes";
import { DeleteButton } from "@/lib/utils/DeleteButton";
import formatMinutesToHoursAndMinutes from "@/lib/utils/timeFormatter";

export const WorkTimeDetail = () => {
  const navigate = useNavigate();
  const { workTimeId } = useParams();
  const [workTimesItem, setWorkTimesItem] = useState<WorkTimesItem>();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const destroyWorkTime = async () => {
    try {
      await deleteWorkTimes(workTimeId);
      navigate("/work_times");
    } catch (e) {
      console.error("エラーが発生しました:", e);
    }
  };

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

        const fetchWorkTimes = await getWorkTimes(workTimeId);
        if (fetchWorkTimes && fetchWorkTimes.data) {
          setWorkTimesItem(fetchWorkTimes.data);
        }
        setIsCheckingLogin(false);
      } catch (e) {
        console.error("エラーが発生しました:", e);
      }
    };

    initialize();
  }, [navigate, workTimeId]);

  if (isCheckingLogin || !workTimesItem) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return (
      date
        .toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Tokyo", // 明示的にJSTで表示
        })
        .replace(":", "時") + "分"
    );
  };

  return (
    <Layout title="出勤詳細">
      <Table.Root size="md">
        <Table.Body>
          <Table.Row>
            <Table.Cell>日付</Table.Cell>
            <Table.Cell>{formatDate(workTimesItem.workDate)}</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>始業時間</Table.Cell>
            <Table.Cell>
              {workTimesItem.clockIn ? formatTime(workTimesItem.clockIn) : ""}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>終業時間</Table.Cell>
            <Table.Cell>
              {workTimesItem.clockOut ? formatTime(workTimesItem.clockOut) : ""}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>勤務時間</Table.Cell>
            <Table.Cell>
              {formatMinutesToHoursAndMinutes(workTimesItem.workMinute)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Cell>休憩時間</Table.Cell>
            <Table.Cell>
              {formatMinutesToHoursAndMinutes(
                workTimesItem.breakDurationMinute
              )}
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

      <DeleteButton onClick={() => destroyWorkTime()} />

      <Box textAlign="center">
        <Link to="/work_times">勤務一覧に戻る</Link>
      </Box>
    </Layout>
  );
};
