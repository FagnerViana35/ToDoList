import store from './redux/store';
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';

function App() {
  return (
  <Provider store={store}>
   <BrowserRouter>
   <Routes>
        <Route path="home" element={<Home />} />
        <Route path="" element={<Login />} />
    </Routes>
  </BrowserRouter>
  </Provider>
  );
}
export default App;
