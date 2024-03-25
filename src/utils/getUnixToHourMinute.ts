function getUnixToHourMinute(
  unixTime: string,
  timezoneUnix: number,
  timeFormat: string
) {
  const localTime = parseInt(unixTime) + timezoneUnix; // convert to local time
  const timestampInMs = localTime * 1000;
  const date = new Date(timestampInMs);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const result = `${hours}:${minutes}`;

  function to12HourClock(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    const time12 = `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;

    return time12;
  }

  if (timeFormat === "24h") {
    return result;
  } else {
    return to12HourClock(result);
  }
}

export default getUnixToHourMinute;
