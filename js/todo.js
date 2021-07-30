const todo = document.querySelector('.todo');
const todoForm = todo.querySelector('.todo__form');
const todoInput = todoForm.querySelector('#todo__form__input');
const listContainer = todo.querySelector('.todo__list-container__lists');

const TODO_KEY = 'todoList';
const CHECKED_TODO_CLASS = 'cutline';
const DRAGGED_CLASS = 'dragged';
const DRAG_OVER_CLASS = 'drag-over';

let todoList = [];
let dragTarget;

const saveTodo = () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
};

const deleteTodo = (e) => {
  const targetTodo = e.target.parentNode.parentNode;
  const targetId = e.target.parentNode.id;

  listContainer.removeChild(targetTodo);
  const newTodoList = todoList.filter((todoItem) => {
    return todoItem.id !== Number(targetId);
  });
  todoList = newTodoList;
  saveTodo();
};

const handleCheckTodo = (e) => {
  const targetTodo = e.target.nextSibling;
  const targetId = e.target.parentNode.id;
  targetTodo.classList.toggle(CHECKED_TODO_CLASS);

  for (const todoItem of todoList) {
    if (todoItem.id === Number(targetId)) {
      todoItem.checked = !todoItem.checked;
      break;
    }
  }
  saveTodo();
};

const dragAndDropUpdateTodoList = (dragTarget, dropTarget) => {
  const dragStartTodoId = dragTarget.firstChild.id;
  const dragEndTodoId = dropTarget.firstChild.id;
  const dragStartCheckBox = dragTarget.firstChild.firstChild;
  const dragEndCheckBox = dropTarget.firstChild.firstChild;
  let dragStartIndex;
  let dragEndIndex;
  todoList.forEach((todoItem, index) => {
    if (todoItem.id === Number(dragStartTodoId)) {
      dragStartIndex = index;
    }
    if (todoItem.id === Number(dragEndTodoId)) {
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
  e.dataTransfer.setData('text/html', dragTarget.innerHTML);
  e.dataTransfer.effectAllowed = 'move';
}
function dragEnd() {
  this.classList.remove(DRAGGED_CLASS);

  const draggable = document.querySelectorAll('[draggable=true');
  draggable.forEach((todoItem) => {
    const checkBox = todoItem.firstChild.firstChild;
    const deleteButton = todoItem.firstChild.lastChild;
    checkBox.addEventListener('click', handleCheckTodo);
    deleteButton.addEventListener('click', deleteTodo);
  });
}
function dragEnter(e) {
  e.preventDefault();
  this.classList.add(DRAG_OVER_CLASS);
}
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function dragLeave() {
  this.classList.remove(DRAG_OVER_CLASS);
}
function dragDrop(e) {
  const dropTarget = this;
  if (dragTarget !== this) {
    dragTarget.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');

    dragAndDropUpdateTodoList(dragTarget, dropTarget);
    saveTodo();
  }

  this.classList.remove(DRAG_OVER_CLASS);
}

const makeDraggable = (todoItemContainer) => {
  todoItemContainer.addEventListener('dragstart', dragStart);
  todoItemContainer.addEventListener('dragend', dragEnd);
  todoItemContainer.addEventListener('dragenter', dragEnter);
  todoItemContainer.addEventListener('dragover', dragOver);
  todoItemContainer.addEventListener('dragleave', dragLeave);
  todoItemContainer.addEventListener('drop', dragDrop);
};

const editUpdateTodoList = (editableContent) => {
  const targetId = editableContent.parentNode.id;
  const newValue = editableContent.textContent;

  for (let i = 0; i < todoList.length; i++) {
    if (Number(targetId) === todoList[i].id) {
      todoList[i].todo = newValue;
    }
  }
  saveTodo();
};

const editSaveTodo = (e) => {
  if (e.type === 'keydown' && (e.key === 'Escape' || e.key === 'Enter')) {
    const editableContent = document.querySelector('[contenteditable=true]');
    editableContent.removeAttribute('contenteditable');
  } else if (e.type === 'blur') {
    const editableContent = e.target;
    editUpdateTodoList(editableContent);
  }
};

const addEditable = (e) => {
  const editableContent = e.target;
  editableContent.setAttribute('contenteditable', true);

  const range = document.createRange();
  const selection = window.getSelection();

  range.setStart(editableContent, 1);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  editableContent.focus();

  window.addEventListener('keydown', editSaveTodo);
  editableContent.addEventListener('blur', editSaveTodo);
};

const paintTodoList = (typedTodo) => {
  const todoItemContainer = document.createElement('div');
  todoItemContainer.draggable = 'true';
  listContainer.appendChild(todoItemContainer);
  makeDraggable(todoItemContainer);

  const todoItem = document.createElement('li');
  todoItem.id = typedTodo.id;
  todoItemContainer.appendChild(todoItem);

  const checkBox = document.createElement('input');
  checkBox.type = 'checkBox';
  checkBox.checked = typedTodo.checked;
  todoItem.appendChild(checkBox);
  checkBox.addEventListener('click', handleCheckTodo);

  const todoText = document.createElement('span');
  todoText.innerText = typedTodo.todo;
  todoItem.appendChild(todoText);
  todoText.addEventListener('dblclick', addEditable);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = '❌';
  todoItem.appendChild(deleteButton);
  deleteButton.addEventListener('click', deleteTodo);

  if (typedTodo.checked) {
    todoText.classList.add(CHECKED_TODO_CLASS);
  } else {
    todoText.classList.remove(CHECKED_TODO_CLASS);
  }
};

const loadTodo = () => {
  const localTodoList = JSON.parse(localStorage.getItem(TODO_KEY));
  if (localTodoList) {
    todoList = localTodoList;
    for (let i = 0; i < localTodoList.length; i++) {
      paintTodoList(localTodoList[i]);
    }
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
  todoInput.value = '';
};

(function inintialLoad() {
  const localUsername = localStorage.getItem('username');
  if (localUsername) {
    loadTodo();
    todo.classList.remove('deleted');
  }
})();

todoForm.addEventListener('submit', handleTodoSubmit);
