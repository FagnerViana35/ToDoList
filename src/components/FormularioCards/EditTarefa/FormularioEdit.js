import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTarefa } from '../../../redux/actions/apiActions';
import { MdSave } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import './index.css';

const EditTarefaForm = ({ id, title, description}) => {
  const dispatch = useDispatch();
  console.log(id)
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTarefa(id, { title: newTitle, description: newDescription }));
    window.location.reload();
  };

  const cancel = () => {
    window.location.reload();
  } 


  const isDisabled = !newTitle || !newDescription;

  return (
    <form onSubmit={handleSubmit} className='formulario-edit'>
      <h2>Editar Tarefa</h2>
      <div>
        <label className="title" htmlFor="title">Title:</label>
        <input maxLength="10" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </div>

      <div className="description-edit">
        <label htmlFor="description">description:</label>
        <textarea maxLength="35" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      </div>
      <div className='botoes-edit'>
        <button type="submit" disabled={isDisabled}><MdSave />Salvar</button>
        <button type='button' onClick={cancel}><MdCancel /> Cancelar</button>
      </div>
    </form>
  );
};

export default EditTarefaForm;