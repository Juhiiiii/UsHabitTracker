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

function createHabitDot(label, person, day) {
  const dot = document.createElement("span");
  dot.className = "habit-dot";
  dot.title = label;

  dot.dataset.points = habitPoints[label] || 0;
  dot.dataset.person = person;
  dot.dataset.day = day;

  dot.addEventListener("click", () => {
    dot.classList.toggle("done");
    updateScores();
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
    habitsDiv.appendChild(
      createHabitDot(habit, name.toLowerCase(), day)
    );
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
    dot.dataset.person = "us";
    dot.dataset.day = day;

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



    calendar.appendChild(dayDiv);
  }
}

generateMonth(2026, 1); // February (0-based)

function updateScores() {
  let ashish = 0;
  let you = 0;
  let us = 0;

  document.querySelectorAll(".habit-dot.done").forEach(dot => {
    const points = Number(dot.dataset.points);
    const person = dot.dataset.person;

    if (person === "ashish") ashish += points;
    if (person === "you") you += points;
    if (person === "us") us += points;
  });

  document.getElementById("ashish-total").innerText = ashish;
  document.getElementById("you-total").innerText = you;
  document.getElementById("us-total").innerText = us;
}
