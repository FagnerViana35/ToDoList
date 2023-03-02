export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_COLOR = 'CHANGE_COLOR';

export function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

export function deleteTodoAction(id) {
  return {
    type: DELETE_TODO,
    id
  };
}

export const changeColorAction = (color) => ({
  type: CHANGE_COLOR,
  color
});
