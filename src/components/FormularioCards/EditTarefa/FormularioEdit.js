import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTarefa } from '../../../redux/actions/apiActions';
import { MdSave } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import './index.css';

const EditTarefaForm = ({ id, title, description}) => {
  const dispatch = useDispatch();
  const apiState = useSelector(state => state.api);
  const { data } = apiState || {};
  
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const userData = JSON.parse(localStorage.getItem('dados'));
  let idUser
  userData.map((usuario) => (
    idUser = usuario.id
  ))

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTarefa(id, { title: newTitle, description: newDescription, risco: false, idUser: idUser }));
    window.location.reload();
  };

  const cancel = () => {
    window.location.reload();
  }

  console.log(data.data)
  const isDisabled = !newTitle || !newDescription;

  return (
    <form onSubmit={handleSubmit} className='formulario-edit'>
      <h2>Editar Tarefa</h2>
      {data.data.map((edit) => (
        <>
          <div>
            <label className="title" htmlFor="title">Title:</label>
            <input maxLength="10" type="text" value={title} onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div className="description-edit">
              <label htmlFor="description">Description:</label>
              <textarea maxLength="35" value={description} onChange={(e) => setNewDescription(e.target.value)} />
          </div>
        </>
      ))}
      <div className='botoes-edit'>
        <button type="submit" disabled={isDisabled}><MdSave />Salvar</button>
        <button type='button' onClick={cancel}><MdCancel /> Cancelar</button>
      </div>
    </form>
  );
};

export default EditTarefaForm;