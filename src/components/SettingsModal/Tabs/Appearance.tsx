import {
  ColorPicker,
  Container,
  Switch,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

const Appearance = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <Container>
      <Title order={4} mb={20}>
        Theme
      </Title>
      <Switch
        defaultChecked={colorScheme === "dark"}
        label="Dark Mode"
        onChange={toggleColorScheme}
        onLabel="ON"
        offLabel="OFF"
      />
      <ColorPicker
        format="hex"
        value={theme.primaryColor}
        withPicker={false}
        swatches={["red", "cyan", "green", "yellow", "purple"]}
      />
    </Container>
  );
};

export default Appearance;
