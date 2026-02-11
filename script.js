const calendar = document.getElementById("calendar");
const year = 2026;
const month = 1; // February (0-based)
const currentMonth = `${year}-${String(month + 1).padStart(2, "0")}`;

const habits = [
  "Workout",
  "Learning",
  "Sleep",
  "Steps",
  "No Sugar",
  "No Maida",
  "Meditation"
];

const usPoints = [
  { label: "FaceTime Juhi", points: 100 },
  { label: "Trip with Juhi", points: 500 }
];

const habitPoints = {
  "Workout": 10,
  "Learning": 10,
  "Sleep": 10,
  "Steps": 10,
  "No Sugar": 5,
  "No Maida": 5,
  "Meditation": 10
};

function createHabitDot(label, person, day) {
  const dot = document.createElement("span");
  dot.className = "habit-dot";
  dot.title = label;

  dot.dataset.points = habitPoints[label] || 0;
  dot.dataset.person = person;
  dot.dataset.day = day;

  // 🔑 unique id for persistence
  dot.dataset.id = `${currentMonth}-${day}-${person}-${label}`;

  dot.addEventListener("click", () => {
    dot.classList.toggle("done");
    saveState();
    updateScores();
  });

  return dot;
}




function createPersonBlock(name, day) {
  const wrapper = document.createElement("div");
  wrapper.className = "person";

  const title = document.createElement("div");
  title.className = "person-name";
  title.innerText = name;

  const habitsDiv = document.createElement("div");
  habitsDiv.className = "habits";

  habits.forEach(habit => {
    habitsDiv.appendChild(
      createHabitDot(habit, name.toLowerCase(), day)
    );
  });

  wrapper.appendChild(title);
  wrapper.appendChild(habitsDiv);
  return wrapper;
}

function createUsPointsBlock(day) {
  const wrapper = document.createElement("div");
  wrapper.className = "us-points";

  const title = document.createElement("div");
  title.className = "us-title";
  title.innerText = "Us Points 💖";

  const dots = document.createElement("div");
  dots.className = "habits";

  usPoints.forEach(item => {
    const dot = document.createElement("span");
    dot.className = "habit-dot";
    dot.title = `${item.label} (+${item.points})`;
    
    dot.dataset.points = item.points;
    dot.dataset.person = "us";
    dot.dataset.day = day;
    dot.dataset.id = `${currentMonth}-${day}-us-${item.label}`;

    dot.addEventListener("click", () => {
      dot.classList.toggle("done");
      updateScores();
    });

    dots.appendChild(dot);
  });

  wrapper.appendChild(title);
  wrapper.appendChild(dots);
  return wrapper;
}

function generateMonth(year, month) {
  calendar.innerHTML = "";

  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(year, month, day);

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    if (
      cellDate.toDateString() === today.toDateString()
    ) {
      dayDiv.classList.add("today");
    }

    const dateLabel = document.createElement("div");
    dateLabel.className = "date";
    dateLabel.innerText = day;

    dayDiv.appendChild(dateLabel);
    dayDiv.appendChild(createPersonBlock("Ashish", day));
    dayDiv.appendChild(createPersonBlock("You", day));
    dayDiv.appendChild(createUsPointsBlock(day));
    const scoreRow = document.createElement("div");
    scoreRow.className = "day-score";
    scoreRow.innerHTML = `
      <span class="score-ashish">Ashish: 0</span>
      <span class="score-you">You: 0</span>
      <span class="score-us">Us: 0 💖</span>
    `;
    dayDiv.appendChild(scoreRow);
    calendar.appendChild(dayDiv);
    

  }
  updateScores();

}

// generateMonth(year, month); // February (0-based)

function updateScores() {
  let ashishTotal = 0;
  let youTotal = 0;
  let usTotal = 0;

  // Reset all per-day scores
  document.querySelectorAll(".day").forEach(dayDiv => {
    dayDiv.querySelector(".score-ashish").innerText = "Ashish: 0";
    dayDiv.querySelector(".score-you").innerText = "You: 0";
    dayDiv.querySelector(".score-us").innerText = "Us: 0 💖";
  });

  // Loop through ALL completed dots
  document.querySelectorAll(".habit-dot.done").forEach(dot => {
    const points = Number(dot.dataset.points);
    const person = dot.dataset.person;

    const dayDiv = dot.closest(".day");
    if (!dayDiv) return;

    if (person === "ashish") {
      ashishTotal += points;
      const el = dayDiv.querySelector(".score-ashish");
      el.innerText = `Ashish: ${Number(el.innerText.split(": ")[1]) + points}`;
    }

    if (person === "you") {
      youTotal += points;
      const el = dayDiv.querySelector(".score-you");
      el.innerText = `You: ${Number(el.innerText.split(": ")[1]) + points}`;
    }

    if (person === "us") {
      usTotal += points;
      const el = dayDiv.querySelector(".score-us");
      const current = Number(el.innerText.match(/\d+/)[0]);
      el.innerText = `Us: ${current + points} 💖`;
    }
  });

  // Monthly totals
  document.getElementById("ashish-total").innerText = ashishTotal;
  document.getElementById("you-total").innerText = youTotal;
  document.getElementById("us-total").innerText = usTotal;
}

function saveState() {
  db.collection("us-tracker")
    .doc("shared")
    .set(state);
}


function loadState() {
  db.collection("us-tracker")
    .doc("shared")
    .get()
    .then((doc) => {
      if (doc.exists) {
        state = doc.data();
      }
      generateMonth(year, month);  // Always render
    })
    .catch((error) => {
      console.error("Error loading state:", error);
      generateMonth(year, month);  // Still render even if error
    });
}

loadState();
