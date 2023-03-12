import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTarefa } from '../../../redux/actions/apiActions';

const EditTarefaForm = ({ id, title, subTitle}) => {
  const dispatch = useDispatch();
  console.log(id)
  const [newTitle, setNewTitle] = useState(title);
  const [newSubTitle, setNewSubTitle] = useState(subTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTarefa(id, { title: newTitle, subTitle: newSubTitle }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <input type="text" value={newSubTitle} onChange={(e) => setNewSubTitle(e.target.value)} />
      <button type="submit">Salvar</button>
      <button type="button" >Cancelar</button>
    </form>
  );
};

export default EditTarefaForm;