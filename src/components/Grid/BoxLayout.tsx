import { Paper, useMantineColorScheme } from "@mantine/core";

interface BoxLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  pt?: number;
  p?: string;
  withBorder?: boolean;
}

const BoxLayout: React.FC<BoxLayoutProps> = ({ children, ...props }) => {
  const { colorScheme } = useMantineColorScheme();
  const paperBg = colorScheme === "dark" ? "#2E2E2E" : "#F3F3F3";

  return (
    <Paper radius="lg" bg={paperBg} p="xl" h="100%" withBorder {...props}>
      {children}
    </Paper>
  );
};

export default BoxLayout;
