export function setCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  document.getElementById("stundenMinuten").textContent = `${hours}:${minutes}`      
  document.getElementById("sekunden").textContent = seconds      
}

export function setCurrentDate() {
  const now = new Date();

  document.getElementById("datum").textContent = now.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
}