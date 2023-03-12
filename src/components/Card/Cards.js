import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {fetchApiData}  from '../../redux/actions/apiActions';
import FormularioCards from '../FormularioCards/CreateTarefa/index';
import { deleteTarefa } from '../../redux/actions/apiActions';
import EditarTarefaForm from '../FormularioCards/EditTarefa/index'
import './index.scss';


function TodoList() {
  const [editTarefaId, setEditTarefaId] = useState(null);
  const apiState = useSelector(state => state.api);
  const { data, isLoading, error } = apiState || {};
  console.log(isLoading,)
  const dispatch = useDispatch();


  const handleDelete = (id) => {
    dispatch(deleteTarefa(id));
  };

  const handleEdit = (id) => {
    setEditTarefaId(id);
  };

  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  

  return (
    <div>
        <div className='card'>
            <h1>Todo List</h1>
            <div className='input-card'>
            {editTarefaId ? (
            // renderiza o formulário de edição se editTarefaId não for nulo
            <EditarTarefaForm id={editTarefaId} onCancel={() => setEditTarefaId(null)} />
          ) : (
            // renderiza o formulário de criação de tarefas se editTarefaId for nulo
            <FormularioCards />
          )}
            </div>
        </div>
        <div className='cards'>
            {data?.map(item => (
                <ul key={item.id} className="todos-card">
                    <li className='descricao'>
                        {item.id}
                        {item.title}
                        {item.subtitle}
                        <button onClick={() => handleEdit(item.id)}>Editar</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                </ul>
            ))}
      </div>
    </div>
  );
}

export default TodoList;