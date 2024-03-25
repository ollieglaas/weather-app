function getDayOfWeek(time: string) {
  const date = new Date(parseInt(time) * 1000);
  const day = date.getDay();
  const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

  if (day === day + 1) {
    return "Tomorrow";
  } else return days[day];
}

export default getDayOfWeek;
