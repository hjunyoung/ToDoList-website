# ToDoList-website

Make ToDoList using vanillaJS

## Feature

1. 12hour-clock to 24hour-clock toggle menu.
2. Different greeting message based on current time.
3. User login function.
4. Todolist.
5. Todolist drag-and-drop function.

   <br>

## Issues

[x] Consecutive empty-username login submits make error. Input value doesn't change into empty string. And typing something after empty-username login submit, error message occurs.<br>

- Issue solved: By using 'keydown' eventListener

[x] Login process doesn't work as I expected. After logging in, there is no input area for todo list. And logout button doesn't work.<br>

- Issue solved: By using 'window.location.reload()' method
