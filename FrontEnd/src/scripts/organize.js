import * as name from "convert-seconds-to-human";

export function Organize(duration) {
  const newDuration = name(duration, "cal");

  const dur = newDuration.minutes + ":" + newDuration.seconds;

  return dur;
}
