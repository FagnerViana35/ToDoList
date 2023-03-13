import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createTask } from '../../../redux/actions/apiActions';
import './index.scss'

const FormularioCards = () => {
  const [formData, setFormData] = useState({ title: '', subTitle: '' });
  const dispatch = useDispatch();
  
  
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(createTask(formData));
    formData.subTitle = ''
    formData.title = ''
    window.location.reload();
  };
  const isDisabled = formData.title === '' || formData.subTitle === '';

  return (
  <form onSubmit={handleFormSubmit} className="formulario">
    <div>
      <label className="title" htmlFor="title">Title:</label>
      <input
        maxlength="10"
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label className="subTitle" htmlFor="subTitle">SubTitle:</label>
      <textarea
        maxlength="50"
        id="subTitle"
        name="subTitle"
        value={formData.subTitle}
        onChange={handleInputChange}
      />
    </div>
    <button type="submit" className="submit" disabled={isDisabled}>Submit</button>
  </form>
  );
}

export default FormularioCards;