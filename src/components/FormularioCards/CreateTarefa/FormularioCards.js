import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createTask } from '../../../redux/actions/apiActions';

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
  };


  return (
    <form onSubmit={handleFormSubmit}>
  <div>
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="title"
      name="title"
      value={formData.title}
      onChange={handleInputChange}
    />
  </div>
  <div>
    <label htmlFor="subTitle">SubTitle:</label>
    <input
      type="text"
      id="subTitle"
      name="subTitle"
      value={formData.subTitle}
      onChange={handleInputChange}
    />
  </div>
  <button type="submit">Submit</button>
</form>
  );
}

export default FormularioCards;