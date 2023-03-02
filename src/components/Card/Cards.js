import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, deleteTodoAction} from '../../redux/actions/todoActions';
import './index.scss';


function TodoList() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('');
  const [contador, setContador] = useState(0);

  const dispatch = useDispatch();

  const todos = useSelector(state => state.todos);

  function handleAddTodo() {
    if (!text) return;
    const newTodo = { id: contador, titulo: title, descricao: text, prioridade: priority };
    dispatch(addTodoAction(newTodo));
    setContador(contador => contador + 1);
    setTitle('')
    setText('')
    setPriority('');
  }

  function handleDelete(id) {
    dispatch(deleteTodoAction(id));
  }

  return (
    <div>
        <div className='card'>
            <h1>Todo List</h1>
            <div className='input-card'>
                {/* <input type="text" value={title} onChange={e => setTitle(e.target.value)} /> */}
                <textarea type="text" value={text} onChange={e => setText(e.target.value)} />
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
        </div>
        <div className='cards'>
            {todos.map(todo => (
                <ul key={todo.id} className="todos-card">
                    <li className='descricao'>
                        {contador}
                        {todo.descricao}
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                </ul>
            ))}
      </div>
    </div>
  );
}

export default TodoList;