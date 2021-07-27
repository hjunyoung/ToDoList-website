const todo = document.querySelector(".todo");
const todoForm = todo.querySelector(".todo__form");
const todoInput = todoForm.querySelector("#todo__form__input");
const listContainer = todo.querySelector(".todo__list-container__lists");

const TODO_KEY = "todoList";
const CHECKED_TODO_CLASS = "cutline";

let todoList = [];

const saveTodo = () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
};

const loadTodo = () => {
  const localTodoList = JSON.parse(localStorage.getItem(TODO_KEY));
  if (localTodoList) {
    todoList = localTodoList;
    for (const todo of localTodoList) {
      paintTodoList(todo);
    }
  }
};

const deleteTodo = (e) => {
  const targetTodo = e.target.parentNode;
  const targetId = targetTodo.id;

  listContainer.removeChild(targetTodo);
  const newTodoList = todoList.filter((todo) => {
    return todo.id !== Number(targetId);
  });
  todoList = newTodoList;
  saveTodo();
};

const handleCheckTodo = (e) => {
  const targetTodo = e.target.nextSibling;
  const targetId = e.target.parentNode.id;
  targetTodo.classList.toggle(CHECKED_TODO_CLASS);

  for (const todo of todoList) {
    if (todo.id === Number(targetId)) {
      todo.checked = !todo.checked;
      break;
    }
  }
  saveTodo();
};

const paintTodoList = (typedTodo) => {
  const todoItem = document.createElement("li");
  todoItem.id = typedTodo.id;
  listContainer.appendChild(todoItem);

  const checkBox = document.createElement("input");
  checkBox.type = "checkBox";
  checkBox.checked = typedTodo.checked;
  todoItem.appendChild(checkBox);
  checkBox.addEventListener("click", handleCheckTodo);

  const todoText = document.createElement("span");
  todoText.innerText = typedTodo.todo;
  todoItem.appendChild(todoText);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "❌";
  todoItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", deleteTodo);

  if (typedTodo.checked) {
    todoText.classList.add(CHECKED_TODO_CLASS);
  } else {
    todoText.classList.remove(CHECKED_TODO_CLASS);
  }
};

const handleTodoSubmit = (e) => {
  e.preventDefault();
  const inputText = todoInput.value.trim();
  const typedTodo = {
    todo: inputText,
    id: Date.now(),
    checked: false,
  };

  if (inputText) {
    todoList.push(typedTodo);
    paintTodoList(typedTodo);
    saveTodo();
  }
  todoInput.value = "";
};

(function inintialLoad() {
  const localUsername = localStorage.getItem("username");
  if (localUsername) {
    loadTodo();
    todo.classList.remove("deleted");
  }
})();

todoForm.addEventListener("submit", handleTodoSubmit);
