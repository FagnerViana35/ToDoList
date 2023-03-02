import { ADD_TODO, DELETE_TODO, CHANGE_COLOR } from '../actions/todoActions';

const initialState = {
  todos: []
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
      case CHANGE_COLOR:
      return {
        ...state,
        color: action.color
      };
    default:
      return state;
  }
}