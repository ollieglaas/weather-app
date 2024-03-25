import { useUnitContext } from "./useUnits";

export default function useConversion(temp: number) {
  const units = useUnitContext();

  if (units.temperature === "fahrenheit") {
    return temp * 1.8 + 32;
  } else {
    return temp;
  }
}

export function useWindConversion(speed: number) {
  const units = useUnitContext();
  if (units.windSpeed === "mph") {
    return speed * 2.237;
  } else if (units.windSpeed === "kmph") {
    return speed * 3.6;
  } else if (units.windSpeed === "knots") {
    return speed * 1.944;
  } else {
    return speed;
  }
}
