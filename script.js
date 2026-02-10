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

function createHabitCheckbox(label) {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.title = label;
  return input;
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
    habitsDiv.appendChild(createHabitCheckbox(habit));
  });

  wrapper.appendChild(title);
  wrapper.appendChild(habitsDiv);
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

    calendar.appendChild(dayDiv);
  }
}

generateMonth(2026, 1); // February (0-based)
