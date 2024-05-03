const input = document.getElementById("todo-input");
const inputForm = document.getElementById("input-form");
const cards = document.getElementById("cards");

const todosLS = JSON.parse(localStorage.getItem("todos"));

if (todosLS) {
  todosLS.forEach((todo) => addTodo(todo));
}

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userInput = input.value;

  if (userInput) {
    addTodo(userInput);
  } else {
    console.log("Enter todo");
  }
  input.value = "";
});

function addTodo(userStringValue) {
  const card = document.createElement("div");
  card.classList.add("todo-card");

  card.innerHTML = `
        <input type="text" class="list-input" id="list-input" readonly>
            <div class="tools-btn" >
                <button class="completed"><i class="fa-solid fa-check"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
    `;
  cards.appendChild(card);

  const listInput = card.querySelector(".list-input");
  listInput.value = userStringValue;

  const completedBtn = card.querySelector(".completed");
  const deleteBtn = card.querySelector(".delete");

  completedBtn.addEventListener("click", () => {
    listInput.classList.toggle("line-through");
  });

  deleteBtn.addEventListener("click", () => {
    card.remove();
    updateLS();
  });
  updateLS();
}

function updateLS() {
  const todoText = document.querySelectorAll(".list-input");

  const todosLS = [];

  todoText.forEach((todo) => todosLS.push(todo.value));

  localStorage.setItem("todos", JSON.stringify(todosLS));
}
