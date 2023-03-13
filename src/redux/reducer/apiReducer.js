// apiReducer.js
import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from '../actions/apiActions';
import {DELETE_TAREFA_SUCCESS, DELETE_TAREFA_ERROR} from '../actions/apiActions'
import {EDIT_TAREFA_SUCCESS, EDIT_TAREFA_ERROR} from '../actions/apiActions'

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../actions/apiActions';

const initialState = {
    data: [],
    isLoading: false,
    error: null
  };
  
export const apiReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_API_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case FETCH_API_SUCCESS:
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          error: null
        };
      case FETCH_API_FAILURE:
        
        return {
          ...state,
          data: [],
          isLoading: false,
          error: action.payload
        };
        default:
        
        return state;
    }
  };
  
export const deletarTarefaReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_TAREFA_SUCCESS:
        const newTarefas = state.tarefas.filter((tarefa) => tarefa.id !== action.payload);
        return {
          ...state,
          tarefas: newTarefas,
          loading: false,
        };
      case DELETE_TAREFA_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };

export const editarTarefaReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_TAREFA_SUCCESS:
        const updatedTarefas = state.tarefas.map((tarefa) =>
          tarefa.id === action.payload.id ? action.payload.updatedTarefa : tarefa
        );
        return {
          ...state,
          tarefas: updatedTarefas,
          loading: false,
        };
      case EDIT_TAREFA_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST: 
        return { ...state, loading: true };
      case LOGIN_SUCCESS:
        return { ...state, user: action.payload, loading: false, error: null };
      case LOGIN_FAILURE:
        return { ...state, error: action.payload, loading: false };
      case LOGOUT:
        return { ...state, user: null };
      default:
        return state;
    }
};



  