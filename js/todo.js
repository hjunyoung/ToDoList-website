const todo = document.querySelector(".todo");
const todoForm = todo.querySelector(".todo__form");
const todoInput = todoForm.querySelector("#todo__form__input");
const listContainer = todo.querySelector(".todo__list-container__lists");

const TODO_KEY = "todoList";
const CHECKED_TODO_CLASS = "cutline";
const DRAGGED_CLASS = "dragged";
const DRAG_OVER_CLASS = "drag-over";

let todoList = [];
let dragTarget;

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
  const targetTodo = e.target.parentNode.parentNode;
  const targetId = e.target.parentNode.id;

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

const updateTodoList = (dragTarget, dropTarget) => {
  const dragStartTodoId = dragTarget.firstChild.id;
  const dragEndTodoId = dropTarget.firstChild.id;
  const dragStartCheckBox = dragTarget.firstChild.firstChild;
  const dragEndCheckBox = dropTarget.firstChild.firstChild;
  let dragStartIndex;
  let dragEndIndex;
  todoList.forEach((todo, index) => {
    if (todo.id === Number(dragStartTodoId)) {
      dragStartIndex = index;
    }
    if (todo.id === Number(dragEndTodoId)) {
      dragEndIndex = index;
    }
  });
  const newTodoList = [...todoList];

  dragStartCheckBox.checked = todoList[dragStartIndex].checked;
  dragEndCheckBox.checked = todoList[dragEndIndex].checked;

  const tempDragStartTodo = todoList[dragStartIndex];
  newTodoList[dragStartIndex] = todoList[dragEndIndex];
  newTodoList[dragEndIndex] = tempDragStartTodo;
  todoList = newTodoList;
};

function dragStart(e) {
  dragTarget = e.target;
  this.classList.add(DRAGGED_CLASS);
  e.dataTransfer.setData("text/html", dragTarget.innerHTML);
  e.dataTransfer.effectAllowed = "move";
}
function dragEnd(e) {
  this.classList.remove(DRAGGED_CLASS);

  const draggable = document.querySelectorAll("[draggable=true");
  draggable.forEach((todo) => {
    const checkBox = todo.firstChild.firstChild;
    const deleteButton = todo.firstChild.lastChild;
    checkBox.addEventListener("click", handleCheckTodo);
    deleteButton.addEventListener("click", deleteTodo);
  });
}
function dragEnter(e) {
  e.preventDefault();
  this.classList.add(DRAG_OVER_CLASS);
}
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}
function dragLeave(e) {
  this.classList.remove(DRAG_OVER_CLASS);
}
function dragDrop(e) {
  const dropTarget = this;
  if (dragTarget !== this) {
    dragTarget.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");

    updateTodoList(dragTarget, dropTarget);
    saveTodo();
  }

  this.classList.remove(DRAG_OVER_CLASS);
}

const makeDraggable = (todoItemContainer) => {
  todoItemContainer.addEventListener("dragstart", dragStart);
  todoItemContainer.addEventListener("dragend", dragEnd);
  todoItemContainer.addEventListener("dragenter", dragEnter);
  todoItemContainer.addEventListener("dragover", dragOver);
  todoItemContainer.addEventListener("dragleave", dragLeave);
  todoItemContainer.addEventListener("drop", dragDrop);
};

const paintTodoList = (typedTodo) => {
  const todoItemContainer = document.createElement("div");
  todoItemContainer.draggable = "true";
  listContainer.appendChild(todoItemContainer);
  makeDraggable(todoItemContainer);

  const todoItem = document.createElement("li");
  todoItem.id = typedTodo.id;
  todoItemContainer.appendChild(todoItem);

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
