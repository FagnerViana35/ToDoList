import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import  {fetchApiData}  from '../../redux/actions/apiActions';
import { fetchApiDataUsersPorId } from '../../redux/actions/apiActions';
import FormularioCards from '../FormularioCards/CreateTarefa/index';
import { deleteTarefa } from '../../redux/actions/apiActions';
import EditarTarefaForm from '../FormularioCards/EditTarefa/index'
import { FaTrash } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import './index.css';
import { editTarefa } from '../../redux/actions/apiActions'; 


function TodoList() {
  const [editTarefaId, setEditTarefaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiState = useSelector(state => state.api);
  const { data, isLoading, error } = apiState || {};
  const dispatch = useDispatch();



  const handleDelete = (id) => {
    dispatch(deleteTarefa(id));
    setShowModal(true);
    if(showModal === false){
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleCheckboxChange = (event, itemId) => {
    const updatedTasks = apiState?.data?.data?.map(task => {
      console.log(task.id, itemId)
      if (task.id === itemId) {
        dispatch(editTarefa(itemId, { ...task, risco: event.target.checked, title: 'Novo' }));
        window.location.reload();
      }
      return task;
    });
    
    if (updatedTasks) {
      if (event.target.checked) {
        
        //window.location.reload();
        console.log('Foi')
      } else {
        console.log('Não ')
      }
    }
  };


  const handleEdit = (id) => {
    setEditTarefaId(id);
  };

  useEffect(() => {
    // dispatch(fetchApiData());
    const userDataString = localStorage.getItem('dados');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const id = userData;
    id.map((usuario) =>(
      dispatch(fetchApiDataUsersPorId(usuario.id))
    ))
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(data)
  
  return (
    <div>
        <div className='card'>
            <h1>Todo List</h1>
            <div className='input-card'>
            {editTarefaId ? (
            // renderiza o formulário de edição se editTarefaId não for nulo
            <EditarTarefaForm id={editTarefaId} data={apiState} onCancel={() => setEditTarefaId(null)} />
          ) : (
            // renderiza o formulário de criação de tarefas se editTarefaId for nulo
            <FormularioCards />
          )}
            </div>
        </div>
        <div className='cards'>
            {data?.data?.map(item => (
                <ul key={item.id} className='todos-card'>
                    <li className='descricao'>
                    <input
                        type="checkbox"
                        value={item.id}
                        onChange={(event) => handleCheckboxChange(event, item.id)}
                        disabled={item.risco === true}
                      />
                      <div className={item.risco === true ? 'riscado' : ''}>
                        <span>{item.title}</span>
                        <span>{item.description}</span>
                      </div>
                        <div className='botoes'>
                          <button disabled={item.risco === true} onClick={() => handleEdit(item.id)}><BsPencil /></button>
                          <button onClick={() => handleDelete(item.id)}><FaTrash /></button>
                        </div>
                    </li>
                </ul>
            ))}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>A tarefa foi excluída com sucesso.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;