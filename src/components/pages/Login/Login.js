import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../../redux/actions/apiActions';
import './index.css'
import { fetchApiDataUsersPorEmail } from '../../../redux/actions/apiActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [olho, setOlho] = useState(false);
  const [showPassword, setShowPassword] = useState('password');
  const apiState = useSelector(state => state.api);
  const { data, isLoading, error } = apiState.data || {};

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, senha));
    dispatch(fetchApiDataUsersPorEmail(email));
    console.log(data);
  }

  const handleCheckboxChange = (event) => {
    setOlho(event.target.checked);
    if(olho === true){
      setShowPassword('password');
    }else{
      setShowPassword('text');
    }
  };

  useEffect(() =>{
    localStorage.setItem('dados', JSON.stringify(data));
  })

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <h1>Faço Login</h1>
        <div>
          <label>Email:</label>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} ></input>
        </div>
        <div className='input-password'>
          <label>Senha:</label>
          <div className='input-olho'>
            <input className='input-senha' type={showPassword} value={senha} onChange={(e) => setSenha(e.target.value)} />
            <input className='input-checkbox' type='checkbox' onChange={handleCheckboxChange} checked={olho}/>
          </div>
          <span>{showPassword === 'password' ? 'Ocultar': 'Parecer'}</span>

        </div>

        <button type="submit">Login</button>
        <Link to={'/register'}>Register</Link>
      </form>
    </div>
  );
}

export default Login;