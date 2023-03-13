import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/apiActions';
import './index.scss'

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, senha));
    console.log(email, senha);
  }
  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;