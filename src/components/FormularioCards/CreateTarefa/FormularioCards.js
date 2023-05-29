import React, { useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { createTask } from '../../../redux/actions/apiActions';
import './index.css';

const FormularioCards = () => {
  const userData = JSON.parse(localStorage.getItem('dados'));
  let idUser
  userData.map((usuario) => (
    idUser = usuario.id
  ))

  const [formData, setFormData] = useState({ title: '', description: '', risco: false, idUser: idUser });
  const dispatch = useDispatch();
  
  
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
      
    });
    console.log(formData)
  };

  useEffect(() => {
    // const userData = JSON.parse(localStorage.getItem('dados'));
    // let userId;
    // userData.map((usuario) => (
    //   userId = usuario.id
    // ))
    console.log(idUser);
  }, [dispatch]);
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(createTask(formData));
    formData.title = ''
    formData.description = ''
    window.location.reload();
  };
  const isDisabled = formData.title === '' || formData.description === '';

  return (
  <form onSubmit={handleFormSubmit} className="formulario">
    <div>
      <label className="title" htmlFor="title">Title:</label>
      <input
        maxLength="10"
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label className="description" htmlFor="description">SubTitle:</label>
      <textarea
        maxLength="35"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
    </div>
    <button type="submit" className="submit" disabled={isDisabled}>Submit</button>
  </form>
  );
}

export default FormularioCards;