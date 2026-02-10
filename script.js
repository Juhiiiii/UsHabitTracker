const calendar = document.getElementById("calendar");

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

function createHabitDot(label) {
  const dot = document.createElement("span");
  dot.className = "habit-dot";
  dot.title = label;
  dot.dataset.points = habitPoints[label] || 0;

  dot.addEventListener("click", () => {
    dot.classList.toggle("done");
  });

  return dot;
}


function createPersonBlock(name) {
  const wrapper = document.createElement("div");
  wrapper.className = "person";

  const title = document.createElement("div");
  title.className = "person-name";
  title.innerText = name;

  const habitsDiv = document.createElement("div");
  habitsDiv.className = "habits";

  habits.forEach(habit => {
    habitsDiv.appendChild(createHabitDot(habit));
  });

  wrapper.appendChild(title);
  wrapper.appendChild(habitsDiv);
  return wrapper;
}

function createUsPointsBlock() {
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

    dot.addEventListener("click", () => {
      dot.classList.toggle("done");
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
    dayDiv.appendChild(createPersonBlock("Ashish"));
    dayDiv.appendChild(createPersonBlock("You"));
    dayDiv.appendChild(createUsPointsBlock());


    calendar.appendChild(dayDiv);
  }
}

generateMonth(2026, 1); // February (0-based)

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    e.target.classList.toggle("active");
    updateScores();
  }
});

function updateScores() {
  let ashishTotal = 0;
  let youTotal = 0;
  let usTotal = 0;

  const days = document.querySelectorAll(".day-card");

  days.forEach(day => {
    let ashishDay = day.querySelectorAll('.dot[data-person="ashish"].active').length;
    let youDay = day.querySelectorAll('.dot[data-person="you"].active').length;
    let usDay = day.querySelectorAll('.dot[data-person="us"].active').length;

    // Save per-day display (optional – next step enhancement)
    ashishTotal += ashishDay;
    youTotal += youDay;
    usTotal += usDay;
  });

  document.getElementById("ashish-total").innerText = ashishTotal;
  document.getElementById("you-total").innerText = youTotal;
  document.getElementById("us-total").innerText = usTotal;
}

