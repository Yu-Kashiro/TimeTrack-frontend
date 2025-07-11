import { deleteWorkTime, getWorkTime } from "@/lib/api/workTimes";
import { Layout } from "@/lib/components/Layout";
import { MainButton } from "@/lib/components/MainButton";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteButton } from "@/lib/components/DeleteButton";
import type { WorkTimesItem } from "@/types/workTimesItem";
import { useLoginCheck } from "@/lib/hooks/useLoginCheck";
import { LoadingSpinner } from "@/lib/components/LoadingSpinner";
import { WorkTimeDetailTable } from "@/lib/components/WorkTimeDetailTable";

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
      await deleteWorkTime(workTimeId);
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
        const fetchWorkTimes = await getWorkTime(workTimeId);
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
      <WorkTimeDetailTable {...workTimesItem} />

      <MainButton
        colorPalette={"blue"}
        color={"black"}
        onClick={() => navigate(`/work_times/registration/${workTimesItem.id}`)}
      >
        修正する
      </MainButton>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DeleteButton onClick={() => destroyWorkTime()} />
      )}

      <Box textAlign="center">
        <Link to="/work_times">勤務一覧に戻る</Link>
      </Box>
    </Layout>
  );
};
