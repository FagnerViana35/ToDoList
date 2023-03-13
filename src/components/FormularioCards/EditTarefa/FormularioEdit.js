import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTarefa } from '../../../redux/actions/apiActions';
import { MdSave } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import './index.scss';

const EditTarefaForm = ({ id, title, subTitle}) => {
  const dispatch = useDispatch();
  console.log(id)
  const [newTitle, setNewTitle] = useState('');
  const [newSubTitle, setNewSubTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTarefa(id, { title: newTitle, subTitle: newSubTitle }));
    window.location.reload();
  };

  const cancel = () => {
    window.location.reload();
  } 


  const isDisabled = !newTitle || !newSubTitle;

  return (
    <form onSubmit={handleSubmit} className='formulario-edit'>
      <h2>Editar Tarefa</h2>
      <div>
        <label className="title" htmlFor="title">Title:</label>
        <input maxlength="10" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </div>

      <div className="subTitle-edit">
        <label htmlFor="subTitle">SubTitle:</label>
        <textarea maxlength="50" value={newSubTitle} onChange={(e) => setNewSubTitle(e.target.value)} />
      </div>
      <div className='botoes-edit'>
        <button type="submit" disabled={isDisabled}><MdSave />Salvar</button>
        <button type='button' onClick={cancel}><MdCancel /> Cancelar</button>
      </div>
    </form>
  );
};

export default EditTarefaForm;