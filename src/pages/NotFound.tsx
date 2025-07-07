import { Box } from "@chakra-ui/react";
import { Layout } from "@/lib/components/Layout";

export const NotFound = () => {
  return (
    <Layout title="404エラー">
      <Box textAlign="center">ページが見つかりませんでした。</Box>
    </Layout>
  );
};
