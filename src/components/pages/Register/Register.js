import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cadastrarUsuario } from '../../../redux/actions/apiActions';
import './index.scss';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();
//   const { error, isLoading, user } = useSelector((state) => state.cadastroUsuario);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(cadastrarUsuario(nome, email, senha));
    
  };

//   if (isLoading) {
//     return <p>Carregando...</p>;
//   }

//   if (error) {
//     return <p>Erro ao cadastrar usuário: {error}</p>;
//   }

//   if (user) {
//     return <p>Usuário cadastrado com sucesso!</p>;
//   }

  return (
    <div className='cadastro-container'>
    <form onSubmit={handleSubmit} className='cadastro-form'>
        <h1>Registro</h1>
      <label>
        Nome:
        <input type="text" value={nome} onChange={handleNomeChange} required/>
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} required/>
      </label>
      <label>
        Senha:
        <input type="password" value={senha} onChange={handleSenhaChange} required/>
      </label>
      <button type="submit">Cadastrar</button>
    </form>
    </div>
  );
};

export default CadastroUsuario;