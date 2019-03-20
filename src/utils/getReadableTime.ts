export function getReadableTime(sec: number, ms?: boolean, with_seconds?: boolean) {
    if (!sec) { return "00:00"; }

    // Get hours from milliseconds
    let hours = sec / (60 * 60);
    if (ms) {
        hours = sec / (60 * 60 * 1000);
    }
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours : `0${absoluteHours}`;

    // Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes : `0${absoluteMinutes}`;

    // Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = absoluteSeconds > 9 ? absoluteSeconds : `0${absoluteSeconds}`;

    let str = "";

    if (h !== "00") {
        str += `${h}:${m}${with_seconds ? `:${s}` : ""}`;
    } else {

        str += `${m}:${s}`;
    }

    return str;
}