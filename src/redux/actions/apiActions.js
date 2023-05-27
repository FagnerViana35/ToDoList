// apiActions.js
import axios from 'axios';

export const FETCH_API_REQUEST = 'FETCH_API_REQUEST';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAILURE = 'FETCH_API_FAILURE';

export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const DELETE_TAREFA_SUCCESS = 'DELETE_TAREFA_SUCCESS';
export const DELETE_TAREFA_ERROR = 'DELETE_TAREFA_ERROR';

export const EDIT_TAREFA_SUCCESS = 'EDIT_TAREFA_SUCCESS';
export const EDIT_TAREFA_ERROR = 'EDIT_TAREFA_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


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
    axios.get('http://localhost:4200/tasks')
      .then(response => {
        const data = response;
        dispatch(fetchApiSuccess(data));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchApiFailure(errorMsg));
      });
  };
};


export const createTask = (newTask) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:4200/tasks', newTask);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: newTask });
  } catch (error) {
    dispatch({ type: 'CREATE_TASK_FAILURE', payload: error.message });
  }
};

export const deleteTarefa = (id) => async (dispatch) => {
  try {
    console.log('Chegou aqui:', id)
    axios.delete(`http://localhost:4200/tasks/${id}`);
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
    const response = await axios.put(`http://localhost:4200/tasks/${id}`, newData);
    dispatch({ type: 'EDIT_TAREFA_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'EDIT_TAREFA_ERROR', payload: error.message });
  }
};

export const cadastro = (nome, email, senha) => async dispatch => {
  try {
    dispatch(loginRequest());

    const response = await fetch(`https://localhost:7223/listarUser?skip=0&take=50`);
    const data = await response.json();

    const user = data.find(u => u.email === email && u.senha === senha);
    if (user) {
      dispatch(loginSuccess(user));
      window.location.href = '/home';
    } else {
      dispatch(loginFailure('Invalid username or password'));
      alert('Senha ou Email incorreto(s)')
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const cadastrarUsuarioRequest = () => ({
  type: 'CADASTRAR_USUARIO_REQUEST'
});

export const cadastrarUsuarioSuccess = (user) => ({
  type: 'CADASTRAR_USUARIO_SUCCESS',
  payload: user
});

export const cadastrarUsuarioFailure = (error) => ({
  type: 'CADASTRAR_USUARIO_FAILURE',
  payload: error
});

export const cadastrarUsuario = (nome, email, senha) => async (dispatch) => {
  try {
    dispatch(cadastrarUsuarioRequest());
    const response = await axios.post('http://localhost:4200/users', {nome, email, senha});
    dispatch(cadastrarUsuarioSuccess(response));
    window.location.href = '/home';
  } catch (error) {
    dispatch(cadastrarUsuarioFailure(error.message));
  }
};


const loginRequest = () => ({ type: 'LOGIN_REQUEST' }); 
const loginSuccess = user => ({ type: 'LOGIN_SUCCESS', payload: user });
const loginFailure = error => ({ type: 'LOGIN_FAILURE', payload: error });


const logoutRequest = () => ({type: 'LOGOUT_REQUEST',});
const clearUserInfo = () => ({type: 'CLEAR_USER_INFO',});

export const login = (email, senha) => async dispatch => {
  try {
    dispatch(loginRequest());

    const response = await axios.get(`http://localhost:4200/users?email=${email}&senha=${senha}`);
    const data = response.data;
    console.log(response)
    const user = data.find(u => u.email === email && u.senha === senha);
    console.log(data)
    console.log(user)
    if (user) {
      window.location.href = '/home';
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure('Invalid username or password'));
      alert('Senha ou Email incorreto(s)')
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logout = () => dispatch => {
  dispatch(logoutRequest());
  dispatch(clearUserInfo()); // remove as informações do usuário do estado global
  window.location.href = '/'; // redireciona para a página de login
};


