// apiActions.js
import axios from 'axios';

export const FETCH_API_REQUEST = 'FETCH_API_REQUEST';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAILURE = 'FETCH_API_FAILURE';

export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const DELETE_TAREFA_SUCCESS = 'DELETE_TAREFA_SUCCESS';
export const DELETE_TAREFA_ERROR = 'DELETE_TAREFA_ERROR';



export const fetchApiRequest = () => ({
  type: 'FETCH_API_REQUEST'
});

export const fetchApiSuccess = data => ({
  type: 'FETCH_API_SUCCESS',
  payload: data
});

export const fetchApiFailure = error => ({
  type: 'FETCH_API_FAILURE',
  payload: error
});

export const fetchApiData = () => {
  return dispatch => {
    dispatch(fetchApiRequest());
    axios.get('https://localhost:7223/listaTarefa')
      .then(response => {
        const data = response.data;
        dispatch(fetchApiSuccess(data));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchApiFailure(errorMsg));
      });
  };
};


export const createTask = (taskData) => async (dispatch) => {
  try {
    const response = await fetch('https://localhost:7223/createTarefa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const createdTask = await response.json();
    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: createdTask });
  } catch (error) {
    dispatch({ type: 'CREATE_TASK_FAILURE', payload: error.message });
  }
};


export const deleteTarefa = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://localhost:7223/deleteTarefa/${id}`);
    // Dispara a action de sucesso
    dispatch(deleteTarefaSuccess(id));
  } catch (error) {
    // Dispara a action de erro
    dispatch(deleteTarefaError(error));
  }
};

export const deleteTarefaSuccess = (id) => ({
  type: 'DELETE_TAREFA_SUCCESS',
  payload: id,
});

export const deleteTarefaError = (error) => ({
  type: 'DELETE_TAREFA_ERROR',
  payload: error,
});

export const editTarefa = (id, newData) => async (dispatch) => {
  try {
    const response = await axios.put(`https://localhost:7223/editarTarefa/${id}`, newData);
    dispatch({ type: 'EDIT_TAREFA_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'EDIT_TAREFA_ERROR', payload: error.message });
  }
};


