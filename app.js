const HABITS = [
  { key: "workout", label: "Workout", points: 10 },
  { key: "learning", label: "Learning", points: 10 },
  { key: "sleep", label: "Sleep by 12:30", points: 10 },
  { key: "steps", label: "10k Steps", points: 10 },
  { key: "noSugar", label: "No Sugar", points: 5 },
  { key: "noMaida", label: "No Maida / Fried", points: 5 },
  { key: "meditation", label: "Meditation", points: 10 }
];

const BONUS = [
  { key: "videoCallJuhi", label: "Video call Juhi 💖", points: 100 },
  { key: "tripJuhi", label: "Trip with Juhi ✈️", points: 500 }
];

const USERS = ["ashish", "you"];

const app = document.getElementById("app");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // 0-based

function getMonthDays(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function renderMonth() {
  app.innerHTML = "";
  const daysInMonth = getMonthDays(year, month);

  for (let day = 1; day <= daysInMonth; day++) {
    const dateId = formatDate(year, month, day);

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    dayDiv.innerHTML = `
      <h3>${day}</h3>
      <div class="users">
        <div class="user ashish">
          <strong>Ashish</strong>
          ${HABITS.map(h => `
            <label>
              <input type="checkbox" data-user="ashish" data-date="${dateId}" data-habit="${h.key}">
              ${h.label}
            </label>
          `).join("")}
        </div>

        <div class="user you">
          <strong>You</strong>
          ${HABITS.map(h => `
            <label>
              <input type="checkbox" data-user="you" data-date="${dateId}" data-habit="${h.key}">
              ${h.label}
            </label>
          `).join("")}
        </div>
      </div>
    `;

    app.appendChild(dayDiv);
  }
}

renderMonth();
