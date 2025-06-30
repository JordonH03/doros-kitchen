import { millisecondsToMinutes, millisecondsToSeconds, minutesToSeconds } from "date-fns"

export function formatTime(milliseconds: number): string {
    const minutes = millisecondsToMinutes(milliseconds);
    const seconds = millisecondsToSeconds(milliseconds) - minutesToSeconds(minutes);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}