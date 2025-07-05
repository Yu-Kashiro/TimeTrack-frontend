import { Stack } from "@chakra-ui/react/stack";
import { Heading } from "@chakra-ui/react/typography";
import type { ReactNode } from "react";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export const Layout = ({ title,children }: LayoutProps) => {
  return (
    <Stack gap="4" justify="center">
      <Heading size="2xl" mb={5} textAlign="center">
        {title}
      </Heading>
        {children}
    </Stack>
  );
};
