# ToDoList-website

Make ToDoList using vanillaJS

## Feature

1. 12hour-clock to 24hour-clock toggle menu.
2. Different greeting message based on current time.
3. User login function.
4. Todolist.
5. Todolist drag-and-drop function.
6. Font color and background color custumizizing.
   <br>

## Issues

- [x] Consecutive empty-username login submits make error. Input value doesn't change into empty string. And typing something after empty-username login submit, error message occurs.<br>

  - Issue solved: By using `keydown` eventListener

- [x] When setting only one color among font-color and background-color, the other color value is saved as `undefined`.<br>

  - Issue solved: By saving current font-color and background-color, if those color aren't saved when setting colors.
