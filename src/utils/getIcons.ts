import ClearDay from "/animated_icons/day.svg";
import SunCloud from "/animated_icons/suncloud.svg";
import Clouds from "/animated_icons/cloudy.svg";
import CloudRain from "/animated_icons/cloudrain.svg";
import CloudSun from "/animated_icons/cloudsun.svg";
import Thunder from "/animated_icons/thunder.svg";
import Snow from "/animated_icons/snow.svg";
import ClearNight from "/animated_icons/night.svg";
import MoonCloud from "/animated_icons/mooncloud.svg";

const icons: { [key: string]: string } = {
  "01d": ClearDay,
  "01n": ClearNight,
  "02d": SunCloud,
  "02n": MoonCloud,
  "03d": Clouds,
  "03n": Clouds,
  "04d": Clouds,
  "04n": Clouds,
  "09d": CloudRain,
  "09n": CloudRain,
  "10d": CloudSun,
  "10n": CloudRain,
  "11d": Thunder,
  "11n": Thunder,
  "13d": Snow,
  "13n": Snow,
  "50d": Clouds,
  "50n": Clouds,
};

export default icons;
