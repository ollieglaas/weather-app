import { Modal, Drawer, useMantineColorScheme, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SettingsModal from "../SettingsModal/SettingsModal";
import { FiSettings } from "react-icons/fi";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import FavouritesDrawer from "../Favourites/FavouritesDrawer";

import LightModeLogo from "/logos/weathercheck-blacktext.svg";
import DarkModeLogo from "/logos/weathercheck-whitetext.svg";
import { useState } from "react";

interface NavBarProps {
  fetchData: (city: string) => void;
  fetchForecast: (city: string) => void;
}

const NavBar = ({ fetchData, fetchForecast }: NavBarProps) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const bg = colorScheme === "dark" ? "bg-[#2E2E2E]" : "bg-[#F3F3F3]";
  const Logo = colorScheme === "dark" ? DarkModeLogo : LightModeLogo;

  const [favIconHover, setFavIconHover] = useState(false);

  return (
    <>
      <div
        className={`flex flex-row px-5 h-24 w-full items-center justify-between ${bg}`}
      >
        <div>
          <Image src={Logo} alt="" w={180} className="cursor-pointer" />
        </div>
        <div className="flex flex-row space-x-20 pr-10 items-center">
          <span className="cursor-pointer">
            {favIconHover ? (
              <MdOutlineFavorite
                size={25}
                onClick={openDrawer}
                onMouseLeave={() => setFavIconHover(false)}
              />
            ) : (
              <MdOutlineFavoriteBorder
                size={25}
                onClick={openDrawer}
                onMouseEnter={() => setFavIconHover(true)}
              />
            )}
          </span>
          <span className="cursor-pointer">
            <FiSettings size={25} onClick={openModal} />
          </span>
        </div>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="Favourites"
        position="right"
      >
        <FavouritesDrawer
          closeDrawer={closeDrawer}
          fetchData={fetchData}
          fetchForecast={fetchForecast}
        />
      </Drawer>

      <Modal
        opened={opened}
        onClose={closeModal}
        title="Settings"
        centered
        size="lg"
      >
        <SettingsModal />
      </Modal>
    </>
  );
};

export default NavBar;
