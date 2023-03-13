import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {fetchApiData, logout}  from '../../redux/actions/apiActions';
import FormularioCards from '../FormularioCards/CreateTarefa/index';
import { deleteTarefa } from '../../redux/actions/apiActions';
import EditarTarefaForm from '../FormularioCards/EditTarefa/index'
import { FaTrash } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import './index.scss';


function TodoList() {
  const [editTarefaId, setEditTarefaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiState = useSelector(state => state.api);
  const { data, isLoading, error } = apiState || {};
  console.log(isLoading,)
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
  
  console.log(data)
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
                        <span>{item.id}</span>
                        <span>{item.title}</span>
                        <span>{item.subTitle}</span>
                        <div className='botoes'>
                          <button onClick={() => handleEdit(item.id)}><BsPencil /></button>
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