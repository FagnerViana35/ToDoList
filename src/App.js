import store from './redux/store';
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import CadastroUsuario from './components/pages/Register/Register';

function App() {
  return (
  <Provider store={store}>
   <BrowserRouter>
   <Routes>
        <Route path="" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<CadastroUsuario />} />
    </Routes>
  </BrowserRouter>
  </Provider>
  );
}
export default App;
