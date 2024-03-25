import { Tabs } from "@mantine/core";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { PiPaintBrush } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";
import Appearance from "./Tabs/Appearance";
import Units from "./Tabs/Units";
import Favourites from "./Tabs/Favourites";

const SettingsModal = () => {
  return (
    <Tabs
      variant="pills"
      radius="md"
      orientation="vertical"
      defaultValue="units"
    >
      <Tabs.List>
        <Tabs.Tab value="units" leftSection={<TbRulerMeasure />}>
          Units
        </Tabs.Tab>
        <Tabs.Tab value="appearance" leftSection={<PiPaintBrush />}>
          Appearance
        </Tabs.Tab>
        <Tabs.Tab value="favourites" leftSection={<MdOutlineFavoriteBorder />}>
          Favourites
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="units">
        <Units />
      </Tabs.Panel>

      <Tabs.Panel value="appearance">
        <Appearance />
      </Tabs.Panel>

      <Tabs.Panel value="favourites">
        <Favourites />
      </Tabs.Panel>
    </Tabs>
  );
};

export default SettingsModal;
