export function setCurrentTime(timezone) {
  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());

  const hours = parts.find(part => part.type === "hour").value;
  const minutes = parts.find(part => part.type === "minute").value;
  const seconds = parts.find(part => part.type === "second").value;

  document.getElementById("stundenMinuten").textContent = `${hours}:${minutes}`      
  document.getElementById("sekunden").textContent = seconds      
}

export function setCurrentDate(timezone) {
  const now = new Date();

  document.getElementById("datum").textContent = now.toLocaleDateString("de-DE", {
    timeZone: timezone,
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
}