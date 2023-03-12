
import store from './redux/store';
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TodoList from './components/Card/Cards';

function App() {
  return (
  <Provider store={store}>
   <BrowserRouter>
   <Routes>
          <Route path="" element={<TodoList />} />
        </Routes>
  </BrowserRouter>
  </Provider>
  );
}
export default App;
